/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function definePixivController(PluginBase, WidgetContentController) {

    /**
     * Define pixiv controller
     * @class PixivController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PixivController = function PixivController() {
    };

    return PixivController.extend('PixivController', {

        /**
         * Set embedded content
         * @memberOf PixivController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var embed = this.model.getPrefs('pixivEmbedCode'),
                script = this.controller.getEmbedCode(embed);

            if (script) {
                this.view.elements.$pixiv.renderEmbeddedContent(script);
            }
        },

        /**
         * Validate pixiv
         * @memberOf PixivController
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

            if (embed.match(/^<script/)) {

                return $(embed)[0];

            } else {

                this.scope.logger.warn('Invalid Pixiv embed code');
                return false;
            }
        },

        /**
         * Add Pixiv rule
         * @memberOf PixivController
         * @param e
         */
        addPixivRule: function addPixivRule(e) {

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
