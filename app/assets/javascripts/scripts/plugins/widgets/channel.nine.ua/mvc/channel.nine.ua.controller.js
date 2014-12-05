/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineChannelNineUaController(PluginBase, WidgetContentController) {

    /**
     * Define channelnineua controller
     * @class ChannelNineUaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ChannelNineUaController = function ChannelNineUaController() {
    };

    return ChannelNineUaController.extend('ChannelNineUaController', {

        /**
         * Set embedded content
         * @member ChannelNineUaController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$channelnineua.renderEmbeddedContent(
                this.model.getPrefs('channelnineuaEmbedCode')
            );
        },

        /**
         * Add ChannelNineUa rule
         * @member ChannelNineUaController
         * @param e
         */
        addChannelNineUaRule: function addChannelNineUaRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
