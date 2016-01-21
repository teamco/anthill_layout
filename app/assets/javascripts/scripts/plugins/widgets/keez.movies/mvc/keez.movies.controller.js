/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineKeezMoviesController(PluginBase, WidgetContentController) {

    /**
     * Define keezmovies controller
     * @class KeezMoviesController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var KeezMoviesController = function KeezMoviesController() {
    };

    return KeezMoviesController.extend('KeezMoviesController', {

        /**
         * Set embedded content
         * @memberOf KeezMoviesController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('keezmoviesEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$keezmovies.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate keezmovies
         * @memberOf KeezMoviesController
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

                this.scope.logger.warn('Invalid KeezMovies embed code');
                return false;
            }
        },

        /**
         * Add KeezMovies rule
         * @memberOf KeezMoviesController
         * @param e
         */
        addKeezMoviesRule: function addKeezMoviesRule(e) {

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
