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
    var Event = function Event() {
    };

    return Event.extend({
        addListener : function addListener(opts) {
            opts = this.base.define(opts, {});
            if (this.base.isObject(opts)) {
                if (this.base.lib.hash.isHashEmpty(opts)) {
                    return false;
                }
                var event = {};
                event[opts.eventName] = opts;
                this.listeners.push(event);
                this[this.scope.observer.scopeName].observer.addEvent(opts.eventName);
                this.events[this[this.scope.observer.scopeName].observer.onEvent(event[opts.eventName])] = opts.eventName;
                return this.events[opts.eventName];
            }
            return false;
        },
        defineListeners : function defineListeners(scope, opts) {
            if (this.base.isDefined(opts)) {
                if (this.base.isArray(opts)) {
                    var i, length = opts.length;
                    for (i = 0; i < length; i++) {
                        this.addListener(opts[i]);
                    }
                }
            }
            return opts;
        }
    }, Base);

});