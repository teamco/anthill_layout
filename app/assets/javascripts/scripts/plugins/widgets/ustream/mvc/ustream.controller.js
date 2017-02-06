/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineUstreamController(PluginBase, WidgetContentController) {

    /**
     * Define ustream controller
     * @class UstreamController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var UstreamController = function UstreamController() {
    };

    return UstreamController.extend('UstreamController', {

        /**
         * Set embedded content
         * @memberOf UstreamController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('ustreamEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$ustream.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate ustream
         * @memberOf UstreamController
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

                this.scope.logger.warn('Invalid Ustream embed code');
                return false;
            }
        },

        /**
         * Add Ustream rule
         * @memberOf UstreamController
         * @param {Event} e
         */
        addUstreamRule: function addUstreamRule(e) {

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
