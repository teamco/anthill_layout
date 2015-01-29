/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePetPassportController(PluginBase, WidgetContentController) {

    /**
     * Define pet.passport controller
     * @class PetPassportController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PetPassportController = function PetPassportController() {
    };

    return PetPassportController.extend('PetPassportController', {

        /**
         * Set embedded content
         * @member PetPassportController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$petpassport.renderEmbeddedContent();
        },

        /**
         * Add PetPassport rule
         * @member PetPassportController
         * @param e
         */
        addPetPassportRule: function addPetPassportRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});