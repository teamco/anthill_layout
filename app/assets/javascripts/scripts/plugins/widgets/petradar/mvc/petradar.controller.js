/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePetradarController(PluginBase, WidgetContentController) {

    /**
     * Define petradar controller
     * @class PetradarController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PetradarController = function PetradarController() {
    };

    return PetradarController.extend('PetradarController', {

        /**
         * Set embedded content
         * @member PetradarController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$petradar.renderEmbeddedContent();
        },

        /**
         * Add Petradar rule
         * @member PetradarController
         * @param e
         */
        addPetradarRule: function addPetradarRule(e) {

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