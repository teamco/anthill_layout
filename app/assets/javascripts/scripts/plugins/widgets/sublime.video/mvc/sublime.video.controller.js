/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineSublimeVideoController(PluginBase, WidgetContentController) {

    /**
     * Define sublimevideo controller
     * @class SublimeVideoController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SublimeVideoController = function SublimeVideoController() {
    };

    return SublimeVideoController.extend('SublimeVideoController', {

        /**
         * Set embedded content
         * @member SublimeVideoController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('sublimevideoEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$sublimevideo.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate sublimevideo
         * @member SublimeVideoController
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

                this.scope.logger.warn('Invalid SublimeVideo embed code');
                return false;
            }
        },

        /**
         * Add SublimeVideo rule
         * @member SublimeVideoController
         * @param e
         */
        addSublimeVideoRule: function addSublimeVideoRule(e) {

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
