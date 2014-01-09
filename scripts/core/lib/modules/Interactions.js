/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/21/13
 * Time: 4:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function defineInteractions(Base) {

    var Interactions = function Interactions() {
    };

    return Interactions.extend({

        /**
         * Check permission
         */
        checkPermission: function checkPermission() {
            this.scope.permission.check({
                capability: this.constructor.name.toLowerCase(),
                callback: this.init.bind(this)
            });
        },

        /**
         * Debug UI
         * @param event
         * @param ui
         */
        debugUI: function debugUI(event, ui) {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.debugInteractions,
                [this.scope, event, ui]
            );
        },

        isEnabled: function isEnabled() {
            return
        },

        isDisabled: function isDisabled() {

        }


    }, Base);

});