/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill'
], function defineBaseEvent(AntHill) {

    /**
     * BaseEvent constructor
     * @class BaseEvent
     * @extends AntHill
     * @constructor
     */
    var BaseEvent = function BaseEvent() {
    };

    return BaseEvent.extend('BaseEvent', {

        /**
         * Check if event was available in event list
         * @memberOf BaseEvent
         * @param {string} event
         * @returns {boolean}
         */
        isEvent: function isEvent(event) {
            return this.eventList.hasOwnProperty(event);
        },

        /**
         * Find event in a whole project
         * @memberOf BaseEvent
         * @param {*} root
         * @param {string} uuid
         * @return {*}
         */
        findItemByEventUUID: function findItemByEventUUID(root, uuid) {

            if (!root) {
                this.scope.logger.error('Undefined root', root);
            }

            if (!root.observer) {
                this.scope.logger.error('Undefined observer', root);
                return false;
            }

            // Get child node
            var child = root.observer.getEventName(uuid);

            if (child) {
                return root;
            }

            if (typeof(root.controller.getContent) === 'function') {

                child = root.controller.getContent().
                    observer.getEventName(uuid);

                if (child) {
                    return root;
                }
            }

            // Get all items
            var items = root.model.getItems();

            for (var index in items) {

                if (items.hasOwnProperty(index)) {

                    var item = items[index];

                    // Recursive search
                    var search = item.eventmanager.findItemByEventUUID(
                        item, uuid
                    );

                    if (search) {
                        return item;
                    }
                }
            }
        },

        /**
         * Get event list
         * @memberOf BaseEvent
         * @returns {{}}
         */
        getEvents: function getEvents() {
            return this.eventList;
        },

        /**
         * Add event listener
         * @memberOf BaseEvent
         * @param {{eventName}} opts
         * @returns {*}
         */
        addListener: function addListener(opts) {
            var scope = this.scope,
                observer = scope.observer,
                events = this.events,
                base = this.base;

            opts = base.define(opts, {}, true);
            if (base.lib.hash.isHashEmpty(opts)) {
                return false;
            }
            observer.addEvent(opts.eventName);
            events[observer.onEvent(opts)] = opts.eventName;

            return opts.eventUUID;
        },

        /**
         * Subscribe event
         * @memberOf BaseEvent
         * @param {{event, callback, [params], [eventName], [scope]}} opts
         * @param {Boolean} internal
         * @returns {Boolean|String}
         */
        subscribe: function subscribe(opts, internal) {
            var base = this.base, event;
            opts = base.define(opts, {}, true);
            internal = base.defineBoolean(internal, false, true);

            if (base.isString(opts.event)) {
                opts.eventName = opts.event;
            } else {
                opts.eventName = opts.event.eventName;
                opts.params = opts.event.params;
                opts.callback = base.define(opts.event.callback, opts.callback);
                opts.scope = opts.event.scope;
            }

            var eventKey = (opts.eventName + '').toCamel();

            if (!base.isDefined(opts.eventName)) {
                this.scope.logger.warn('Undefined event', opts);
                return false;
            }

            if (!internal && !this.eventList.hasOwnProperty(eventKey)) {
                this.scope.logger.warn('Untrusted external event', opts);
                return false;
            }

            if (!internal && base.isObject(opts.event) && !base.isDefined(opts.params)) {
                opts.params = this.scope.observer.listeners[
                    this.eventList[eventKey]
                    ][0].params;
            }

            this.eventList[eventKey] = opts.eventName;

            return this.addListener({
                eventName: opts.eventName,
                callback: opts.callback,
                scope: opts.scope,
                params: opts.params
            });
        },

        /**
         * Bind element events
         * @memberOf BaseEvent
         * @param {String|Array} events
         * @param {String} on
         * @returns {Boolean}
         */
        onEvent: function onEvent(events, on) {
            var scope = this.scope,
                controller = scope.controller;

            if (typeof(events) === 'string') {
                events = [events];
            }

            for (var i = 0, l = events.length; i < l; i++) {

                var event = events[i],
                    method = controller[events[i]];

                if (scope.controller.checkCondition({
                    condition: !scope.base.isFunction(method),
                    msg: 'Undefined method',
                    type: 'warn',
                    args: [controller, event, on]
                })) {
                    continue;
                }

                this.$.on(
                    [on, event].join('.'),
                    method.bind(controller)
                );
            }
        },

        /**
         * Subscribe to external published events
         * @memberOf BaseEvent
         * @param data
         * @return {Array}
         */
        publishOn: function publishOn(data) {

            var eventUUIDs = [];

            for (var i = 0, l = data.events.length; i < l; i++) {

                /**
                 * Define event opts
                 * @memberOf publishOn
                 */
                var event = data.events[i];

                eventUUIDs.push(
                    data.scope.eventmanager.subscribe({
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
        },

        /**
         * Re-Emmit event
         * @memberOf BaseEvent
         * @param {string} name
         */
        reEmmit: function reEmmit(name) {
            var evt = document.createEvent('Event');
            evt.initEvent(name, false, false);
            window.dispatchEvent(evt);
        }

    }, AntHill.prototype);
});