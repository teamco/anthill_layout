/**
 * Created by Vladimir Tkach.
 * User: i061485
 * Date: 1/5/12
 * Time: 11:40 AM
 * Project: JetBrains RubyMine
 **/

define([
    'modules/base'
], function defineObserver(Base) {
    var Observer = function Observer() {
        this.listeners = {};
    };

    return Observer.extend({

        /**
         * Get events list
         * @member {Function} Observer
         * @returns {*}
         */
        getEventList: function getEventList() {
            return this.scope.eventmanager.events;
        },
        /**
         * Get event UUID
         * @member {Function} Observer
         * @param {String} eventName
         * @returns {Array}
         */
        getEventUUID: function getEventUUID(eventName) {
            var index, uuid = [];
            for (index in this.listeners) {
                if (this.listeners.hasOwnProperty(index)) {
                    var events = this.listeners[index],
                        event, i = 0, l = events.length;

                    for (i; i < l; i += 1) {
                        event = events[i];
                        if (event.eventName === eventName) {
                            uuid.push(event.eventUUID);
                        }
                    }
                }
            }
            return uuid;
        },
        /**
         * Get event name
         * @member {Function} Observer
         * @param {String} eventUUID
         * @return {{}}
         */
        getEventName: function getEventName(eventUUID) {
            return this.scope.eventmanager.events[eventUUID];
        },

        /**
         * Execute function after specific timeout
         * @member {Function} Observer
         * @param {Function} fnCallback
         * @param {Number} [msTimeout]
         * @param {*} [thisScope]
         * @param {Array} [args]
         * @return {*}
         */
        defer: function defer(msTimeout, fnCallback, thisScope, args) {
            msTimeout = this.base.define(msTimeout, 0.01);
            args = this.base.define(args, [], true);
            if (msTimeout === 0) {
                fnCallback.apply(thisScope, args);
                return 0;
            } else {
                var bound = function bound() {
                    return fnCallback.apply(thisScope || window, args);
                };
                return window.setTimeout(bound, msTimeout);
            }
        },

        /**
         * Add event
         * @member {Function} Observer
         * @param {String} eventName
         * @return {{}}
         */
        addEvent: function addEvent(eventName) {
            this.listeners[eventName] = this.base.define(this.listeners[eventName], []);
            return this.listeners[eventName];
        },

        /**
         * Remove event
         * @member {Function} Observer
         * @param {String} eventName
         */
        removeEvent: function removeEvent(eventName) {
            delete this.listeners[eventName];
        },

        /**
         * On event
         * @member {String} Observer
         * @param {{eventUUID, params, state, priority, eventName}} opts
         * @return {String}
         */
        onEvent: function onEvent(opts) {
            var base = this.base;
            opts = base.define(opts, {}, true);
            opts.eventUUID = base.lib.generator.UUID();
            opts.params = base.define(opts.params, {}, true);
            opts.state = {};
            // Default: normal,
            // high, low
            var priority = base.define(opts.priority, 'normal');
            this.listeners[opts.eventName].push(opts);
            return opts.eventUUID;
        },

        /**
         * Un event
         * @member {Function} Observer
         * @param {String} eventName
         * @param {String} eventUUID
         * @return {Boolean}
         */
        unEvent: function unEvent(eventName, eventUUID) {
            var eventLength = this.listeners[eventName].length,
                i = 0;
            for (i; i < eventLength; i += 1) {
                if (this.listeners[eventName][i].eventUUID === eventUUID) {
                    delete this.listeners[eventName][i];
                    this.listeners[eventName].splice(i, 1);
                    delete this.scope.eventmanager.events[eventUUID];
                    this.scope.logger.info(
                        'Successfully deleted event',
                        [eventName, eventUUID]
                    );
                }
            }
            this.scope.logger.warn(
                'Unable to delete undefined event',
                [eventName, eventUUID]
            );
        },

        /**
         * @member Observer
         */
        hasEvent: function hasEvent() {
            // TODO
        },

        /**
         * Publish event
         * @member {Function} Observer
         * @param {String} eventName
         * @param {*} [args]
         */
        publish: function publish(eventName, args) {
            var base = this.base,
                scope = this.scope;
            if (!base.isDefined(eventName)) {
                scope.logger.warn('Event', eventName);
            }
            scope.logger.timer(eventName, true);
            args = base.define(args, []);
            if (!base.isArray(args)) {
                args = [args];
            }

            this.fireEvent(this.listeners[eventName], args);
            scope.logger.timer(eventName, false);
        },

        /**
         * Fire event
         * @member {Function} Observer
         * @param {Array} events
         * @param {Array} [args]
         * @return {Boolean}
         */
        fireEvent: function fireEvent(events, args) {

            events = this.base.define(events, [], true);

            var i = 0, l = events.length;
            for (i; i < l; i += 1) {
                if (this.base.isDefined(events[i])) {
                    if (false === this.executeEvent(this.scope, events[i], args)) {
                        return false;
                    }
                }
            }
        },

        /**
         * Execute event
         * @member {Function} Observer
         * @param {*} [scope] // Run callback in default scope
         * @param {{state, callback, scope, params}} opts => {
         *      state: internal hash (private),
         *      callback: fn(),
         *      scope: Override default scope,
         *      params: {
         *          single: true | false,   // Single run (auto unbind)
         *          buffer: timeout (ms)    // Single run in timeout range
         *          timeout: timeout (ms)   // Last call in timeout range,
         *          delay: timeout (ms)     // Run after timeout
         *      }
         * }
         * @param {Array} [args] => [
         *      callback params
         * ]
         * @return
         */
        executeEvent: function executeEvent(scope, opts, args) {

            var base = this.base;

            opts.state.lastCallAt = base.lib.datetime.timestamp();

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
            if (!base.isArray(args)) {
                args = [args];
            }

            // Override default scope
            if (base.isDefined(opts.scope)) {
                scope = opts.scope;
            }

            // Detach event automatically if have single option
            if (opts.params.single) {
                this.unEvent(opts.eventName, opts.eventUUID);
            }

            /**
             * Execute callback is a function which
             * will be executed on fnWrapper return.
             * Note: fnWrapper can override executeCallback function
             * to maintain event options like: delay, buffer, etc...
             */
            var executeCallback = function executeCallback() {

                opts.state.lastExecutionAt = opts.state.lastCallAt;
                if (base.isFunction(opts.callback)) {
                    opts.callback.eventName = opts.eventName;
                    return opts.callback.apply(scope, args);
                }
                return;
            };

            // Fire event only when timeout is over, each event fill reset timeout
            if (opts.params.timeout) {

                if (opts.state.inTimeout) {
                    return;
                }

                var executeCallbackB4Timeout = executeCallback;

                executeCallback = function executeCallback() {
                    opts.state.inTimeout = true;

                    this.defer(opts.params.timeout, function deferCallback() {

                        var currentTime = this.base.timestamp();
                        var triggerTime = opts.state.lastCallAt + opts.params.timeout;

                        /**
                         * If we are reached trigger time (when no new event was occurred
                         * within timeout) then we can continue to executing callback
                         * function.
                         * Else, rerunning this function with defer based on last call at
                         * time.
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

                var executeCallbackB4Defer = executeCallback;

                executeCallback = function executeCallback() {
                    this.defer(opts.params.delay, executeCallbackB4Defer, this);
                };

            }

            return executeCallback.apply(this);

        }

    }, Base);

});