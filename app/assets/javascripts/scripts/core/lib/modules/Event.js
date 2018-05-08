/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * @class BaseEvent
 * @extends AntHill
 */
module.exports = class BaseEvent extends AntHill {

  /**
   * BaseEvent constructor
   * @constructor
   * @param {string} [name]
   * @param [scope]
   */
  constructor(name, scope) {

    super(name || 'BaseEvent', scope, false);

    /**
     * Define event to unsubscribe
     * @property BaseEvent
     * @type {{}}
     */
    this.unSubscribe = {};
  }

  /**
   * Define event as unSubscribe ready
   * @property BaseEvent
   * @param {string} eventName
   * @param {string} eventUUID
   */
  defineEventUnSubscribe(eventName, eventUUID) {

    // Init unSubscribe
    this.unSubscribe = this.unSubscribe || {};
    this.unSubscribe[eventName] = eventUUID;
  }

  /**
   * Detach event as unsubscribe ready
   * @property BaseEvent
   * @param scope
   * @param {string} eventName
   */
  detachEventUnSubscribe(scope, eventName) {

    if (!this.unSubscribe) {
      return false;
    }

    // Remove before subscribe
    this.removeListener({
      scope: scope,
      eventName: eventName,
      eventUUID: this.unSubscribe[eventName]
    });
  }

  /**
   * Check if event was available in event list
   * @property BaseEvent
   * @param {string} event
   * @returns {boolean}
   */
  isEvent(event) {
    return this.eventList.hasOwnProperty(event);
  }

  /**
   * Find event in a whole project
   * @property BaseEvent
   * @param {*} root
   * @param {string} uuid
   * @return {*}
   */
  findItemByEventUUID(root, uuid) {

    if (!root) {
      this.scope.logger.error('Undefined root', root);
    }

    if (!root.observer) {
      this.scope.logger.error('Undefined observer', root);
      return false;
    }

    // Get child node
    let child = root.observer.getEventName(uuid);

    if (child) {
      return root;
    }

    if (typeof(root.controller.getContent) === 'function') {

      child = root.controller.getContent().observer.getEventName(uuid);

      if (child) {
        return root;
      }
    }

    // Get all items
    const items = root.model.getItems();

    for (let index in items) {

      if (items.hasOwnProperty(index)) {

        const item = items[index];

        // Recursive search
        const search = item.eventManager.findItemByEventUUID(item, uuid);

        if (search) {
          return item;
        }
      }
    }
  }

  /**
   * Get event list
   * @property BaseEvent
   * @returns {{}}
   */
  getEvents() {
    return this.eventList;
  }

  /**
   * Add event listener
   * @property BaseEvent
   * @param {{eventName, eventUUID}} opts
   * @returns {*}
   */
  addListener(opts) {
    const scope = this.scope,
        observer = scope.observer,
        events = this.events;

    opts = opts||{};

    if (scope.utils._.isEmpty(opts)) {
      this.logger.warn('Empty opts', opts);
      return false;
    }

    observer.addEvent(opts.eventName);
    events[observer.onEvent(opts)] = opts.eventName;

    return opts.eventUUID;
  }

  /**
   * Remove event listener
   * @property BaseEvent
   * @param {{eventName, eventUUID, scope}} opts
   * @returns {*}
   */
  removeListener(opts) {
    const scope = this.scope,
        observer = opts.scope.observer,
        events = opts.scope.eventManager.events;

    if (!opts.eventUUID) {
      scope.logger.debug('Event not subscribed', opts);
      return false;
    }

    observer.unRegister(opts.eventName, opts.eventUUID);
    delete events[opts.eventUUID];
    delete scope.eventManager.unSubscribe[opts.eventName];
  }

  /**
   * isSubscribed event
   * @property BaseEvent
   */
  isSubscribed() {
    // TODO
  }

  /**
   * Subscribe event
   * @property BaseEvent
   * @param {{event, callback, [params], [eventName], [scope]}} opts
   * @param {boolean} internal
   * @returns {boolean|string}
   */
  subscribe(opts, internal) {
    opts = opts || {};
    internal = typeof internal === 'undefined' ? false : internal;

    if (this.utils._.isString(opts.event)) {
      opts.eventName = opts.event;
    } else {
      opts.eventName = opts.event.eventName;
      opts.params = opts.event.params;
      opts.callback = opts.event.callback || opts.callback;
      opts.scope = opts.event.scope;
    }

    const eventKey = (opts.eventName + '').toCamelCase();

    if (!opts.eventName) {
      this.scope.logger.warn('Undefined event', opts);
      return false;
    }

    if (!internal && !this.eventList.hasOwnProperty(eventKey)) {
      this.scope.logger.warn('Untrusted external event', opts);
      return false;
    }

    if (!internal && opts.event && !opts.params) {
      opts.params = this.scope.observer.listeners[this.eventList[eventKey]][0].params;
    }

    this.eventList[eventKey] = opts.eventName;

    return this.addListener({
      eventName: opts.eventName,
      callback: opts.callback,
      scope: opts.scope,
      params: opts.params
    });
  }

  /**
   * Bind element events
   * @property BaseEvent
   * @param {string|Array} events
   * @param {string} on
   * @returns {boolean}
   */
  onEvent(events, on) {
    const scope = this.scope,
        controller = scope.controller;

    if (typeof(events) === 'string') {
      events = [events];
    }

    for (let i = 0, l = events.length; i < l; i++) {
      const event = events[i],
          method = controller[events[i]];

      if (typeof method !== 'function') {
        this.logger.warn('Undefined method', event, method);
        continue;
      }

      this.$.on([on, event].join('.'), method.bind(controller));
    }
  }

  /**
   * Subscribe to external published events
   * @property BaseEvent
   * @param data
   * @return {Array}
   */
  static publishOn(data) {
    let eventUUIDs = [];

    for (let i = 0, l = data.events.length; i < l; i++) {

      /**
       * Define event opts
       * @property publishOn
       */
      const event = data.events[i];

      eventUUIDs.push(
          data.scope.eventManager.subscribe({
            event: {
              eventName: event.eventName,
              params: event.params,
              scope: event.scope
            },
            callback: data.callback
          }, false)
      );
    }

    return eventUUIDs;
  }

  /**
   * Re-Emmit event
   * @property BaseEvent
   * @param {string} name
   */
  reEmmit(name) {
    const evt = document.createEvent('Event');
    evt.initEvent(name, false, false);
    window.dispatchEvent(evt);
  }

  /**
   * Find events bound on an element
   * @property BaseEvent
   * @param {BaseElement} $element
   * @returns {*}
   */
  eventsBound($element) {
    // Lookup events for this particular Element
    return $._data($element.$[0], 'events');
  }
};