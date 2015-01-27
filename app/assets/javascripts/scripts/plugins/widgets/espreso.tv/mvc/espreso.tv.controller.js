/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineEspresoTvController(PluginBase, WidgetContentController) {

    /**
     * Define espresotv controller
     * @class EspresoTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EspresoTvController = function EspresoTvController() {
    };

    return EspresoTvController.extend('EspresoTvController', {

        /**
         * Set embedded content
         * @member EspresoTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('espresotvUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$espresotv.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate espresotv
         * @member EspresoTvController
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
                this.scope.logger.warn('Invalid espresotv url');
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
         * Add EspresoTv rule
         * @member EspresoTvController
         * @param e
         */
        addEspresoTvRule: function addEspresoTvRule(e) {

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
