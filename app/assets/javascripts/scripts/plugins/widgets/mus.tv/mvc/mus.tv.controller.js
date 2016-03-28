/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineMusTvController(PluginBase, WidgetContentController) {

    /**
     * Define mustv controller
     * @class MusTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MusTvController = function MusTvController() {
    };

    return MusTvController.extend('MusTvController', {

        /**
         * Set embedded content
         * @memberOf MusTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('mustvEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$mustv.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate mustv
         * @memberOf MusTvController
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
                this.scope.logger.warn('Invalid mustv url');
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
         * Add MusTv rule
         * @memberOf MusTvController
         * @param e
         */
        addMusTvRule: function addMusTvRule(e) {

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
