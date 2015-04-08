/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTwentyThreeController(PluginBase, WidgetContentController) {

    /**
     * Define twentythree controller
     * @class TwentyThreeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TwentyThreeController = function TwentyThreeController() {
    };

    return TwentyThreeController.extend('TwentyThreeController', {

        /**
         * Set embedded content
         * @memberOf TwentyThreeController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$twentythree.renderEmbeddedContent(
                this.model.getPrefs('twentythreeEmbedCode')
            );
        },

        /**
         * Add TwentyThree rule
         * @memberOf TwentyThreeController
         * @param e
         */
        addTwentyThreeRule: function addTwentyThreeRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
