/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function defineEvent(Base) {

    /**
     * Event constructor
     * @constructor
     */
    var Event = function Event() {
    };

    return Event.extend({
        /**
         * Add event listener
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
            return events[opts.eventName];
        },
        /**
         * Subscribe event
         * @member {Function} Event
         * @param {{event, callback, [params], [eventName], [scope]}} opts
         * @param {Boolean} internal
         * @returns {Boolean}
         */
        subscribe: function subscribe(opts, internal) {
            var base = this.base, event, params = {};
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

            this.addListener({
                eventName: opts.eventName,
                callback: opts.callback,
                scope: opts.scope,
                params: opts.params
            });
        },

        /**
         * Bind element events
         * @param {String} event
         * @param {String} on
         * @returns {Boolean}
         */
        onEvent: function onEvent(event, on) {
            var scope = this.scope,
                controller = scope.controller,
                method = controller[event];

            if (scope.controller.checkCondition({
                condition: !scope.base.isFunction(method),
                msg: 'Undefined method',
                args: [controller, method]
            })) {
                return false;
            }

            this.$.on([on, event].join('.'), method.bind(controller));
        }
    }, Base);

});