/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineYoutubeController(PluginBase, WidgetContentController) {

    /**
     * Define youtube controller
     * @class YoutubeController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var YoutubeController = function YoutubeController() {
    };

    return YoutubeController.extend('YoutubeController', {

        /**
         * Set embedded content
         * @memberOf YoutubeController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('youtubeUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$youtube.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate youtube
         * @memberOf YoutubeController
         * @param {string} url
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(url) {

            if (!url) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            var mask = this.model.getConfig('mask'),
                regex = this.model.getConfig('regex');

            if (!url.match(regex)) {
                this.scope.logger.warn('Invalid youtube url');
                return false;
            }

            if (url.match(/iframe/)) {

                /**
                 * Embed iframe fix
                 * @type {string}
                 */
                url = $(url).attr('src');
            }

            return url.replace(regex, mask.replace(/\{videoId}/g, '$1')).
                replace(/embed\/embed/, 'embed');
        },

        /**
         * Add Youtube rule
         * @memberOf YoutubeController
         * @param e
         */
        addYoutubeRule: function addYoutubeRule(e) {

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