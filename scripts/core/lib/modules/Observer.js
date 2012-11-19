/**
 * Created by Vladimir Tkach.
 * User: i061485
 * Date: 1/5/12
 * Time: 11:40 AM
 * Project: JetBrains RubyMine
 **/

/**
 * @member Observer
 * @param scope
 * @constructor
 */
define([
    'modules/base'
], function defineObserver(Base) {
    var Observer = function Observer() {
        this.listeners = {};
    };

    return Observer.extend({

        getEventList: function getEventList() {
            return this[this.scopeName].eventManager.listeners;
        },

        getEventUUID: function getEventUUID(eventName) {
            var length = this[this.scopeName].eventManager.listeners.length,
                i;
            for (i = 0; i < length; i++) {
                if (this.base.isHashKey(this[this.scopeName].eventManager.listeners[i], eventName)) {
                    return this[this.scopeName].eventManager.listeners[i][eventName].eventUUID;
                }
            }
            return false;
        },

        /**
         * @member Observable
         * @param eventUUID
         * @return {*}
         */
        getEventName: function getEventName(eventUUID) {
            var length = this[this.scopeName].eventManager.listeners.length,
                i,
                index;
            for (i = 0; i < length; i++) {
                for (index in this[this.scopeName].eventManager.listeners[i]) {
                    if (this[this.scopeName].eventManager.listeners[i].hasOwnProperty(index)
                        && eventUUID === this[this.scopeName].eventManager.listeners[i][index].eventUUID) {
                        return index;
                    }
                }
            }
            return false;
        },

        /**
         * Execute function after specific timeout
         * @member Observer
         * @param msTimeout
         * @param fnCallback
         * @param thisScope
         * @param args
         * @return timeoutObject
         */
        defer: function defer(msTimeout, fnCallback, thisScope, args) {
            msTimeout = this.base.define(msTimeout, 0.01);
            args = this.base.define(args, [], true);
            if (msTimeout === 0) {
                fnCallback.apply(thisScope, args);
                return 0;
            } else {
                var bound = function () {
                    return fnCallback.apply(thisScope || window, args);
                };
                return window.setTimeout(bound, msTimeout);
            }
        },

        /**
         * @member Observer
         * @param eventName
         * @return {*}
         */
        addEvent: function addEvent(eventName) {
            this.listeners[eventName] = this.base.define(this.listeners[eventName], []);
            return this.listeners[eventName];
        },

        /**
         * @member Observer
         * @param eventName
         */
        removeEvent: function removeEvent(eventName) {
            delete this.listeners[eventName];
        },

        /**
         * @member Observer
         * @param opts
         * @return {*}
         */
        onEvent: function onEvent(opts) {
            opts = this.base.define(opts, {}, true);
            opts.eventUUID = this.base.lib.generator.UUID();
            opts.params = this.base.define(opts.params, {}, true);
            opts.state = {};
            // Default: normal,
            // high, low
            var priority = this.base.define(opts.priority, 'normal');
            this.listeners[opts.eventName].push(opts);
            return opts.eventUUID;
        },

        /**
         * @member Observer
         * @param eventName
         * @param eventUUID
         * @return {Boolean}
         */
        unEvent: function unEvent(eventName, eventUUID) {
            var eventLength = this.listeners[eventName].length,
                i = 0;
            for (i; i < eventLength; i += 1) {
                if (this.listeners[eventName][i].eventUUID === eventUUID) {
                    delete this.listeners[eventName][i];
                    this.listeners[eventName].splice(i, 1);
                    delete this[this.scopeName].eventManager.events[eventUUID];
                    return true;
                }
            }
            return false;
        },

        /**
         * @member Observer
         */
        hasEvent: function hasEvent() {
            // TODO
        },

        /**
         * @member Observer
         * @param eventName
         * @param args
         */
        fireEvent: function fireEvent(eventName, args) {
            args = this.base.define(args, []);
            if (!this.base.isArray(args)) {
                args = [args];
            }

            this.fireEventRunner(this.listeners[eventName], args);
        },

        /**
         * @member Observer
         * @param events
         * @param args
         * @return {Boolean}
         */
        fireEventRunner: function fireEventRunner(events, args) {

            events = this.base.define(events, [], true);

            var i = 0, l = events.length;
            for (i; i < l; i += 1) {
                if (this.base.isDefined(events[i])) {
                    if (false === this.executeEvent(this[this.scopeName], events[i], args)) {
                        return false;
                    }
                }
            }
        },

        /**
         * Execute event
         * @member Observer
         * @param scope // Run callback in default scope
         * @param opts => {
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
         * @param args => [
         *      callback params
         * ]
         * @return
         */
        executeEvent: function executeEvent(scope, opts, args) {

            opts.state.lastCallAt = this.base.timestamp();

            // Capture multiple event as single event within buffer time frame
            if (opts.params.buffer) {

                // If defined last call and time diff less than buffer -> break event execution
                if (opts.state.lastExecutionAt
                    && ((opts.state.lastCallAt - opts.state.lastExecutionAt) < opts.params.buffer)) {
                    return;
                }

            }
            // If args is not array -> force to array (else it will broke .apply())
            if (!this.base.isArray(args)) {
                args = [args];
            }

            // Override default scope
            if (this.base.isDefined(opts.scope)) {
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
            var executeCallback = function () {

                opts.state.lastExecutionAt = opts.state.lastCallAt;
                return opts.callback.apply(scope, args);

            };

            // Fire event only when timeout is over, each event fill reset timeout
            if (opts.params.timeout) {

                if (opts.state.inTimeout) {
                    return;
                }

                var executeCallbackB4Timeout = executeCallback;
                executeCallback = function () {

                    opts.state.inTimeout = true;

                    this.defer(opts.params.timeout, function () {

                        var currentTime = this.base.timestamp();
                        var triggerTime = opts.state.lastCallAt + opts.params.timeout;

                        /**
                         * If we are reached trigger time (when no new event was occured within timeout)
                         * then we can continue to executing callback function.
                         * Else, rerunning this function with defer based on last call at time.
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
                executeCallback = function () {

                    this.defer(opts.params.delay, executeCallbackB4Defer, this);

                };

            }

            return executeCallback.apply(this);

        }

    }, Base);

});