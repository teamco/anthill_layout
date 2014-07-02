/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePassportController(PluginBase, WidgetContentController) {

    /**
     * Define passport controller
     * @class PassportController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PassportController = function PassportController() {
    };

    return PassportController.extend('PassportController', {

        /**
         * Set embedded content
         * @member PassportController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$passport.renderEmbeddedContent();
        },

        /**
         * Add Passport rule
         * @member PassportController
         * @param e
         */
        addPassportRule: function addPassportRule(e) {

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