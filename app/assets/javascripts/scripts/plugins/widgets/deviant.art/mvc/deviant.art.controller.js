/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineDeviantArtController(PluginBase, WidgetContentController) {

    /**
     * Define deviantart controller
     * @class DeviantArtController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var DeviantArtController = function DeviantArtController() {
    };

    return DeviantArtController.extend('DeviantArtController', {

        /**
         * Set embedded content
         * @member DeviantArtController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$deviantart.renderEmbeddedContent(
                this.controller.getEmbedCode(
                    this.model.getPrefs('deviantartEmbedCode')
                )
            );
        },

        /**
         * Validate DeviantArt
         * @member DeviantArtController
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
                return embed;
            }

            this.scope.logger.warn('Invalid DeviantArt embed code');
        },

        /**
         * Add DeviantArt rule
         * @member DeviantArtController
         * @param e
         */
        addDeviantArtRule: function addDeviantArtRule(e) {

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
