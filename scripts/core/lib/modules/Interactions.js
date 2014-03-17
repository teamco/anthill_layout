/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/21/13
 * Time: 4:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
], function defineInteractions() {

    /**
     * Define interactions
     * @class Interactions
     * @constructor
     */
    var Interactions = function Interactions() {
    };

    return Interactions.extend({

        /**
         * Check permission
         * @member Interactions
         */
        checkPermission: function checkPermission() {
            this.scope.permission.check({
                capability: this.constructor.name.toLowerCase(),
                callback: this.init.bind(this)
            });
        },

        /**
         * Debug UI
         * @member Interactions
         * @param event
         * @param ui
         */
        debugUI: function debugUI(event, ui) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.debugInteractions,
                [this.scope, event, ui]
            );
        },

        /**
         * Check if enabled
         * @member Interactions
         * @returns {boolean}
         */
        isEnabled: function isEnabled() {
            return true;
        },

        /**
         * Check if disabled
         * @member Interactions
         * @returns {boolean}
         */
        isDisabled: function isDisabled() {
            return false;
        }


    });

});