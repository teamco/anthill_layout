/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePetRadarController(PluginBase, WidgetContentController) {

    /**
     * Define pet.radar controller
     * @class PetRadarController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PetRadarController = function PetRadarController() {
    };

    return PetRadarController.extend('PetRadarController', {

        /**
         * Set embedded content
         * @member PetRadarController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$petradar.renderEmbeddedContent();
        },

        /**
         * Add PetRadar rule
         * @member PetRadarController
         * @param e
         */
        addPetRadarRule: function addPetRadarRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});