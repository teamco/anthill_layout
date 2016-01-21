/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineElevenChannelUaController(PluginBase, WidgetContentController) {

    /**
     * Define elevenchannelua controller
     * @class ElevenChannelUaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ElevenChannelUaController = function ElevenChannelUaController() {
    };

    return ElevenChannelUaController.extend('ElevenChannelUaController', {

        /**
         * Set embedded content
         * @memberOf ElevenChannelUaController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$elevenchannelua.renderEmbeddedContent(
                this.model.getPrefs('elevenchanneluaEmbedCode')
            );
        },

        /**
         * Add ElevenChannelUa rule
         * @memberOf ElevenChannelUaController
         * @param e
         */
        addElevenChannelUaRule: function addElevenChannelUaRule(e) {

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
