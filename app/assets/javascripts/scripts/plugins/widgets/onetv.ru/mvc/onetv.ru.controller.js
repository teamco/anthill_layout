/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineOnetvRuController(PluginBase, WidgetContentController) {

    /**
     * Define onetvru controller
     * @class OnetvRuController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var OnetvRuController = function OnetvRuController() {
    };

    return OnetvRuController.extend('OnetvRuController', {

        /**
         * Set embedded content
         * @memberOf OnetvRuController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('onetvruEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$onetvru.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate onetvru
         * @memberOf OnetvRuController
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

                this.scope.logger.warn('Invalid OnetvRu embed code');
                return false;
            }
        },

        /**
         * Add OnetvRu rule
         * @memberOf OnetvRuController
         * @param {Event} e
         */
        addOnetvRuRule: function addOnetvRuRule(e) {

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
