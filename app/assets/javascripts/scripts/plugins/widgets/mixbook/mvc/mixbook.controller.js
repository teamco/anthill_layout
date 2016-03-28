/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineMixbookController(PluginBase, WidgetContentController) {

    /**
     * Define mixbook controller
     * @class MixbookController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MixbookController = function MixbookController() {
    };

    return MixbookController.extend('MixbookController', {

        /**
         * Set embedded content
         * @memberOf MixbookController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('mixbookEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$mixbook.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate mixbook
         * @memberOf MixbookController
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

            if (embed.match(/^<object/)) {

                return $(embed)[0];

            } else {

                this.scope.logger.warn('Invalid Mixbook embed code');
                return false;
            }
        },

        /**
         * Add Mixbook rule
         * @memberOf MixbookController
         * @param e
         */
        addMixbookRule: function addMixbookRule(e) {

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
