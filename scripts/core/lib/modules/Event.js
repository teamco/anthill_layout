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
        }
    }, Base);

});