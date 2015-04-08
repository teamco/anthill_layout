/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineExtremeTubeController(PluginBase, WidgetContentController) {

    /**
     * Define extremetube controller
     * @class ExtremeTubeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ExtremeTubeController = function ExtremeTubeController() {
    };

    return ExtremeTubeController.extend('ExtremeTubeController', {

        /**
         * Set embedded content
         * @memberOf ExtremeTubeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('extremetubeEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$extremetube.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate extremetube
         * @memberOf ExtremeTubeController
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

                this.scope.logger.warn('Invalid ExtremeTube embed code');
                return false;
            }
        },

        /**
         * Add ExtremeTube rule
         * @memberOf ExtremeTubeController
         * @param e
         */
        addExtremeTubeRule: function addExtremeTubeRule(e) {

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
