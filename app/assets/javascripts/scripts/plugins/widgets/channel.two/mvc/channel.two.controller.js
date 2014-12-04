/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineChannelTwoController(PluginBase, WidgetContentController) {

    /**
     * Define channeltwo controller
     * @class ChannelTwoController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ChannelTwoController = function ChannelTwoController() {
    };

    return ChannelTwoController.extend('ChannelTwoController', {

        /**
         * Set embedded content
         * @member ChannelTwoController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$channeltwo.renderEmbeddedContent(
                this.model.getPrefs('channeltwoEmbedCode')
            );
        },

        /**
         * Add ChannelTwo rule
         * @member ChannelTwoController
         * @param e
         */
        addChannelTwoRule: function addChannelTwoRule(e) {

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
