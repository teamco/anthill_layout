/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineOneTwelveChannelUaController(PluginBase, WidgetContentController) {

    /**
     * Define onetwelvechannelua controller
     * @class OneTwelveChannelUaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OneTwelveChannelUaController = function OneTwelveChannelUaController() {
    };

    return OneTwelveChannelUaController.extend('OneTwelveChannelUaController', {

        /**
         * Set embedded content
         * @memberOf OneTwelveChannelUaController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$onetwelvechannelua.renderEmbeddedContent(
                this.model.getPrefs('onetwelvechanneluaEmbedCode')
            );
        },

        /**
         * Add OneTwelveChannelUa rule
         * @memberOf OneTwelveChannelUaController
         * @param {Event} e
         */
        addOneTwelveChannelUaRule: function addOneTwelveChannelUaRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
