/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineRdioController(PluginBase, WidgetContentController) {

    /**
     * Define rdio controller
     * @class RdioController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var RdioController = function RdioController() {
    };

    return RdioController.extend('RdioController', {

        /**
         * Set embedded content
         * @member RdioController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('rdioEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$rdio.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate rdio
         * @member RdioController
         * @param {string} embed
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(embed) {

            if (!embed) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            // Convert to string
            embed += '';

            if (embed.match(/^<iframe/)) {

                return $(embed).attr('src');

            } else {

                this.scope.logger.warn('Invalid Rdio embed code');
                return false;
            }
        },

        /**
         * Add Rdio rule
         * @member RdioController
         * @param e
         */
        addRdioRule: function addRdioRule(e) {

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