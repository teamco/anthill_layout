/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineChannelTenIlController(PluginBase, WidgetContentController) {

    /**
     * Define channeltenil controller
     * @class ChannelTenIlController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ChannelTenIlController = function ChannelTenIlController() {
    };

    return ChannelTenIlController.extend('ChannelTenIlController', {

        /**
         * Set embedded content
         * @memberOf ChannelTenIlController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$channeltenil.renderEmbeddedContent(
                this.model.getPrefs('channeltenilEmbedCode')
            );
        },

        /**
         * Add ChannelTenIl rule
         * @memberOf ChannelTenIlController
         * @param e
         */
        addChannelTenIlRule: function addChannelTenIlRule(e) {

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
