/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineChannelTwoIlController(PluginBase, WidgetContentController) {

    /**
     * Define channeltwoil controller
     * @class ChannelTwoIlController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ChannelTwoIlController = function ChannelTwoIlController() {
    };

    return ChannelTwoIlController.extend('ChannelTwoIlController', {

        /**
         * Set embedded content
         * @memberOf ChannelTwoIlController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$channeltwoil.renderEmbeddedContent(
                this.model.getPrefs('channeltwoilEmbedCode')
            );
        },

        /**
         * Add ChannelTwoIl rule
         * @memberOf ChannelTwoIlController
         * @param e
         */
        addChannelTwoIlRule: function addChannelTwoIlRule(e) {

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
