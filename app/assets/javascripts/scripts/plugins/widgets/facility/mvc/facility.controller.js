/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineFacilityController(PluginBase, WidgetContentController) {

    /**
     * Define Facility controller
     * @class FacilityController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FacilityController = function FacilityController() {
    };

    return FacilityController.extend('FacilityController', {

        /**
         * Set embedded content
         * @memberOf FacilityController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent();
        },

        /**
         * Add Facility rule
         * @memberOf FacilityController
         * @param e
         */
        addFacilityRule: function addFacilityRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {Facility|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
