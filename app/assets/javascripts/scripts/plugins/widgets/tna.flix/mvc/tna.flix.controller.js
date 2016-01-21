/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTnaFlixController(PluginBase, WidgetContentController) {

    /**
     * Define tnaflix controller
     * @class TnaFlixController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TnaFlixController = function TnaFlixController() {
    };

    return TnaFlixController.extend('TnaFlixController', {

        /**
         * Set embedded content
         * @memberOf TnaFlixController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('tnaflixEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$tnaflix.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate tnaflix
         * @memberOf TnaFlixController
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

            if (embed.match(/<iframe/)) {

                return this.scope.view.locateElement(
                    $(embed), 'iframe'
                ).src;

            } else {

                this.scope.logger.warn('Invalid TnaFlix embed code');
                return false;
            }
        },

        /**
         * Add TnaFlix rule
         * @memberOf TnaFlixController
         * @param e
         */
        addTnaFlixRule: function addTnaFlixRule(e) {

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
