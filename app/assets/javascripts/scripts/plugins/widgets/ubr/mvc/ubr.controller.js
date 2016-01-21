/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineUbrController(PluginBase, WidgetContentController) {

    /**
     * Define ubr controller
     * @class UbrController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var UbrController = function UbrController() {
    };

    return UbrController.extend('UbrController', {

        /**
         * Set embedded content
         * @memberOf UbrController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('ubrEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$ubr.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate ubr
         * @memberOf UbrController
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
                this.scope.logger.warn('Invalid ubr url');
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
         * Add Ubr rule
         * @memberOf UbrController
         * @param e
         */
        addUbrRule: function addUbrRule(e) {

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
