/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineSomeEcardsController(PluginBase, WidgetContentController) {

    /**
     * Define someecards controller
     * @class SomeEcardsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SomeEcardsController = function SomeEcardsController() {
    };

    return SomeEcardsController.extend('SomeEcardsController', {

        /**
         * Set embedded content
         * @memberOf SomeEcardsController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$someecards.renderEmbeddedContent(
                this.model.getPrefs('someecardsEmbedCode')
            );
        },

        /**
         * Add SomeEcards rule
         * @memberOf SomeEcardsController
         * @param e
         */
        addSomeEcardsRule: function addSomeEcardsRule(e) {

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
