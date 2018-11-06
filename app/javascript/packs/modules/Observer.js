/**
 * Created by Vladimir Tkach.
 * User: teamco
 * Date: 1/5/12
 * Time: 11:40 AM
 * Project: JetBrains RubyMine
 **/

module.exports = class Observer {

  /**
   * Define observer
   * @constructor
   * @param scope
   * @class Observer
   */
  constructor(scope) {

    /**
     * @property Observer
     * @type {string}
     */
    this.name = 'Observer';

    /**
     * Define listeners
     * @property Observer
     * @type {{}}
     */
    this.listeners = {};

    /**
     * Define local scope
     * @property Observer
     * @type {module.AntHill}
     */
    this.scope = scope;
  }

  /**
   * Get events list
   * @memberOf Observer
   * @returns {*}
   */
  getEventList() {
    return this.scope.eventManager.events;
  }

  /**
   * Get event UUID
   * @memberOf Observer
   * @param {string} name
   * @returns {[]}
   */
  getEventUUID(name) {
    let index, uuid = [];
    for (index in this.listeners) {
      if (this.listeners.hasOwnProperty(index)) {
        const events = this.listeners[index],
            l = events.length;

        for (let i = 0; i < l; i += 1) {
          const event = events[i];
          if (event.name === name) {
            uuid.push(event.eventUUID);
          }
        }
      }
    }
    return uuid;
  }

  /**
   * Get event name
   * @memberOf Observer
   * @param {string} eventUUID
   * @return {{}}
   */
  getEventName(eventUUID) {
    const events = this.getEventList();
    if (events.hasOwnProperty(eventUUID)) {
      return events[eventUUID];
    }

    this.scope.logger.warn('Undefined event UUID', eventUUID);
  }

  /**
   * Execute function after specific timeout
   * @memberOf Observer
   * @param {Function} fnCallback
   * @param {Number} [msTimeout]
   * @param {*} [thisScope]
   * @param {[]} [args]
   * @return {*}
   */
  defer(msTimeout, fnCallback, thisScope, args) {
    msTimeout = msTimeout || 0.01;
    args = args || [];
    if (msTimeout === 0) {
      fnCallback.apply(thisScope, args);
      return 0;
    } else {
      const bound = () => fnCallback.apply(thisScope || window, args);
      return window.setTimeout(bound, msTimeout);
    }
  }

  /**
   * Add event
   * @memberOf Observer
   * @param {string} name
   * @return {{}}
   */
  addEvent(name) {
    const listeners = this.listeners;
    listeners[name] = listeners[name] || [];
    return listeners[name];
  }

  /**
   * Remove event
   * @memberOf Observer
   * @param {string} name
   */
  removeEvent(name) {
    delete this.listeners[name];
  }

  /**
   * On event
   * @memberOf Observer
   * @param {{eventUUID, params, state, priority, name}} opts
   * @return {string}
   */
  onEvent(opts) {

    const priority = {
          'high': 3,
          'normal': 2,
          'low': 1
        },
        defaultPriority = 'normal';

    opts = opts || {};
    opts.eventUUID = this.scope.utils.gen.UUID();
    opts.params = opts.params || {};
    opts.state = {};
    opts.priority = opts.priority || defaultPriority;

    /**
     * Define array of events
     * @type {[]}
     */
    this.listeners[opts.name] = this.listeners[opts.name] || [];

    // Push event item
    this.listeners[opts.name].push(opts);

    // Sort by priority
    this.listeners[opts.name].sort((a, b) => priority[b.priority || defaultPriority] -
        priority[a.priority || defaultPriority]);

    return opts.eventUUID;
  }

  /**
   * Unregister event
   * @param {string} event
   * @param {string} uuid
   * @returns {string|boolean}
   */
  unRegister(event, uuid) {

    const scope = this.scope,
        listener = this.listeners[event];

    if (!listener) {

      /**
       * Get content
       * @type {*}
       */
      const content = scope.controller.getContent();

      if (content) {
        return content.observer.unRegister.bind(content.observer)(event, uuid);
      } else {
        scope.logger.warn('Undefined event', this.listeners, event, uuid);
        return false;
      }
    }

    for (let i = 0, l = listener.length; i < l; i++) {
      if (listener[i].eventUUID === uuid) {
        delete listener[i];
        listener.splice(i, 1);
        scope.logger.info('Successfully unregistered event', [event, uuid]);
        return uuid;
      }
    }

    this.scope.logger.warn('Unable to delete undefined event', [event, uuid]);
    return false;
  }

  /**
   * Un event
   * @memberOf Observer
   * @param {string} name
   * @param {string} eventUUID
   * @return {boolean}
   */
  unEvent(name, eventUUID) {
    eventUUID = this.unRegister(name, eventUUID);
    if (eventUUID) {
      delete this.scope.eventManager.events[eventUUID];
      return true;
    }
    return false;
  }

  /**
   * Batch events publisher
   * @memberOf Observer
   */
  batchPublish() {
    Object.assign([], arguments).forEach((arg) => this.publish.apply(this, typeof arg === 'string' ? [arg] : arg));
  }

  /**
   * Publish event
   * @memberOf Observer
   * @param {string} name
   * @param {*} [args]
   */
  publish(name, args) {
    const scope = this.scope;

    if (!name) {
      scope.logger.warn('Undefined event', name, args);
    }

    scope.logger.timer(name, true);
    args = Array.isArray(args) ? args : [args];

    /**
     * Get events
     * @type {undefined|[]}
     */
    const events = this.listeners[name];

    if (!events) {
      scope.logger.warn('Undefined event', this.listeners, name);
    }

    this.fireEvent(events || [], args);
    scope.logger.timer(name, false);
  }

  /**
   * Fire event
   * @memberOf Observer
   * @param {[]} events
   * @param {[]} [args]
   * @return {boolean}
   */
  fireEvent(events, args) {
    events.forEach(event => {
      if (event && !this.executeEvent(this.scope, event, args)) {
        return false;
      }
    });
  }

  /**
   * Execute event
   * @memberOf Observer
   * @param {*} [scope]     Run callback in default scope
   * @param {{
   *  state: *,             Private internal hash
   *  callback: Function,   Callback fn
   *  scope: *,             Override default scope
   *  name: string,
   *  eventUUID: string,
   *  params: {
   *    single: boolean,    Single run auto unbind
   *    buffer: number,     Single run in timeout range in ms
   *    timeout: number,    Last call in timeout range in ms
   *    delay: number       Run after timeout in ms
   *  }
   * }} opts
   * @param {[]} [args]     Callback params
   * @return
   */
  executeEvent(scope, opts, args) {

    opts.state.lastCallAt = this.scope.utils.ts.timestamp();

    // Capture multiple event as single event within buffer time frame
    if (opts.params.buffer) {

      // If defined last call and time diff less than buffer ->
      // break event execution
      if (opts.state.lastExecutionAt
          && ((opts.state.lastCallAt - opts.state.lastExecutionAt) <
              opts.params.buffer)) {
        return;
      }

    }

    // If args is not array -> force to array (else it will broke .apply())
    if (!Array.isArray(args)) {
      args = [args];
    }

    // Override default scope
    if (opts.scope) {
      scope = opts.scope;
    }

    // Detach event automatically if have single option
    if (opts.params.single) {
      this.unEvent(opts.name, opts.eventUUID);
    }

    /**
     * Execute callback is a function which
     * will be executed on fnWrapper return.
     * Note: fnWrapper can override executeCallback function
     * to maintain event options like: delay, buffer, etc...
     * @returns {*}
     */
    let executeCallback = () => {
      opts.state.lastExecutionAt = opts.state.lastCallAt;
      if (opts.callback) {
        opts.callback.eventName = opts.name;
        return opts.callback.apply(scope, args);
      } else {
        scope.logger.warn('Undefined callback', opts);
        return false;
      }
    };

    // Fire event only when timeout is over, each event fill reset timeout
    if (opts.params.timeout) {
      if (opts.state.inTimeout) {
        return false;
      }

      /**
       * Handle super
       * @method executeCallbackB4Timeout
       * @type {function}
       * @override executeCallback
       */
      const executeCallbackB4Timeout = executeCallback;

      /**
       * @method executeCallback
       */
      executeCallback = () => {
        opts.state.inTimeout = true;

        this.defer(opts.params.timeout, () => {

          const currentTime = this.scope.utils.ts.timestamp();
          const triggerTime = opts.state.lastCallAt + opts.params.timeout;

          /**
           * If we are reached trigger time (when no new event was occurred
           * within timeout) then we can continue to executing callback
           * function. Else, rerunning this function with defer based on last
           * call at time.
           */
          if (triggerTime > currentTime) {
            this.defer(triggerTime - currentTime, executeCallback, this);
            return;
          }

          executeCallbackB4Timeout.apply(this);
          opts.state.inTimeout = false;

        }, this);
      };
    }

    // Run in defer if have delay
    if (opts.params.delay) {
      const executeCallbackB4Defer = executeCallback;
      executeCallback = () => this.defer(opts.params.delay, executeCallbackB4Defer, this);
    }

    return executeCallback.apply(this);
  }
};