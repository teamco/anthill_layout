/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineVimeoController(PluginBase, WidgetContentController) {

    /**
     * Define vimeo controller
     * @class VimeoController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var VimeoController = function VimeoController() {
    };

    return VimeoController.extend('VimeoController', {

        /**
         * Set embedded content
         * @member VimeoController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('vimeoUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$vimeo.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate vimeo
         * @member VimeoController
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
                this.scope.logger.warn('Invalid vimeo url');
                return false;
            }

            if (url.match(/iframe/)) {

                /**
                 * Embed iframe fix
                 * @type {string}
                 */
                url = $(url).attr('src');
            }

            return url.replace(regex, mask.replace(/{{videoId}}/g, '$4'));;
        },

        /**
         * Add Vimeo rule
         * @member VimeoController
         * @param e
         */
        addVimeoRule: function addVimeoRule(e) {

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