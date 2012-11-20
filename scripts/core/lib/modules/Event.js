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
            opts = this.base.define(opts, {}, true);
            if (this.base.lib.hash.isHashEmpty(opts)) {
                return false;
            }
            var scope = this.getScope(),
                observer = scope.observer,
                events = this.events;
            observer.addEvent(opts.eventName);
            events[observer.onEvent(opts)] = opts.eventName;
            return events[opts.eventName];
        },
        getScope: function getScope() {
            return this[this.scope];
        }
    }, Base);

});