/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineVideoPayNetController(PluginBase, WidgetContentController) {

    /**
     * Define VideoPayNet controller
     * @class VideoPayNetController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var VideoPayNetController = function VideoPayNetController() {
    };

    return VideoPayNetController.extend('VideoPayNetController', {

        /**
         * Set embedded content
         * @member VideoPayNetController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('videopaynetEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$bigmirnet.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate iframe
         * @member VideoPayNetController
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

                this.scope.logger.warn('Invalid VideoPayNet embed code');
                return false;
            }
        },

        /**
         * Add VideoPayNet rule
         * @member VideoPayNetController
         * @param e
         */
        addVideoPayNetRule: function addVideoPayNetRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
