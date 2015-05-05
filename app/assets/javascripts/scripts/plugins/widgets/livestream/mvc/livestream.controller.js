/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineLivestreamController(PluginBase, WidgetContentController) {

    /**
     * Define livestream controller
     * @class LivestreamController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var LivestreamController = function LivestreamController() {
    };

    return LivestreamController.extend('LivestreamController', {

        /**
         * Set embedded content
         * @memberOf LivestreamController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('livestreamEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$livestream.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate livestream
         * @memberOf LivestreamController
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

                this.scope.logger.warn('Invalid Livestream embed code');
                return false;
            }
        },

        /**
         * Add Livestream rule
         * @memberOf LivestreamController
         * @param e
         */
        addLivestreamRule: function addLivestreamRule(e) {

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
