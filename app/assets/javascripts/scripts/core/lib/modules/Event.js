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
     * @memberOf BaseEvent
     * @type {{}}
     */
    this.unSubscribe = {};
  }

  /**
   * Subscribe to external published events
   * @memberOf BaseEvent
   * @param data
   * @return {Array}
   */
  publishOn(data) {
    let eventUUIDs = [];

    for (let i = 0, l = data.events.length; i < l; i++) {

      /**
       * Define event opts
       * @memberOf publishOn
       */
      const event = data.events[i];

      eventUUIDs.push(data.scope.eventManager.subscribe({
        event: {
          name: event.name,
          params: event.params,
          scope: event.scope
        },
        callback: data.callback
      }, false));
    }

    return eventUUIDs;
  }

  /**
   * Define event as unSubscribe ready
   * @memberOf BaseEvent
   * @param {string} name
   * @param {string} eventUUID
   */
  defineEventUnSubscribe(name, eventUUID) {

    // Init unSubscribe
    this.unSubscribe = this.unSubscribe || {};
    this.unSubscribe[name] = eventUUID;
  }

  /**
   * Detach event as unsubscribe ready
   * @memberOf BaseEvent
   * @param scope
   * @param {string} name
   */
  detachEventUnSubscribe(scope, name) {
    if (!this.unSubscribe) {
      return false;
    }

    // Remove before subscribe
    this.removeListener({
      scope: scope,
      name: name,
      eventUUID: this.unSubscribe[name]
    });
  }

  /**
   * Check if event was available in event list
   * @memberOf BaseEvent
   * @param {string} event
   * @returns {boolean}
   */
  isEvent(event) {
    return this.eventList.hasOwnProperty(event);
  }

  /**
   * Find event in a whole project
   * @memberOf BaseEvent
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
   * @memberOf BaseEvent
   * @returns {{}}
   */
  getEvents() {
    return this.eventList;
  }

  /**
   * Add event listener
   * @memberOf BaseEvent
   * @param {{name, eventUUID}} opts
   * @returns {*}
   */
  addListener(opts) {
    const scope = this.scope,
        observer = scope.observer,
        events = this.events;

    opts = opts || {};

    if (scope.utils._.isEmpty(opts)) {
      this.logger.warn('Empty opts', opts);
      return false;
    }

    observer.addEvent(opts.name);
    events[observer.onEvent(opts)] = opts.name;

    return opts.eventUUID;
  }

  /**
   * Remove event listener
   * @memberOf BaseEvent
   * @param {{name, eventUUID, scope}} opts
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

    observer.unRegister(opts.name, opts.eventUUID);
    delete events[opts.eventUUID];
    delete scope.eventManager.unSubscribe[opts.name];
  }

  /**
   * isSubscribed event
   * @memberOf BaseEvent
   */
  isSubscribed() {
    // TODO
  }

  /**
   * Subscribe event
   * @memberOf BaseEvent
   * @param {{event, callback, [params], [name], [scope]}} opts
   * @param {boolean} internal
   * @returns {boolean|string}
   */
  subscribe(opts, internal) {
    opts = opts || {};
    internal = typeof internal === 'undefined' ? false : internal;

    if (this.utils._.isString(opts.event)) {
      opts.name = opts.event;
    } else {
      opts.name = opts.event.name;
      opts.params = opts.event.params;
      opts.callback = opts.event.callback || opts.callback;
      opts.scope = opts.event.scope;
    }

    const eventKey = (opts.name + '').toCamelCase();

    if (!opts.name) {
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

    this.eventList[eventKey] = opts.name;

    return this.addListener({
      name: opts.name,
      callback: opts.callback,
      scope: opts.scope,
      params: opts.params
    });
  }

  /**
   * Bind element events
   * @memberOf BaseEvent
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
        this.scope.logger.warn('Undefined method', event, method);
        continue;
      }

      this.$.on([on, event].join('.'), method.bind(controller));
    }
  }

  /**
   * Re-Emmit event
   * @memberOf BaseEvent
   * @param {string} name
   */
  reEmmit(name) {
    const evt = document.createEvent('Event');
    evt.initEvent(name, false, false);
    window.dispatchEvent(evt);
  }

  /**
   * Find events bound on an element
   * @memberOf BaseEvent
   * @param {BaseElement} $element
   * @returns {*}
   */
  eventsBound($element) {
    // Lookup events for this particular Element
    return $._data($element.$[0], 'events');
  }
};