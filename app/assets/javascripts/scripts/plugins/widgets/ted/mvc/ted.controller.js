/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTedController(PluginBase, WidgetContentController) {

    /**
     * Define ted controller
     * @class TedController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TedController = function TedController() {
    };

    return TedController.extend('TedController', {

        /**
         * Set embedded content
         * @memberOf TedController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('tedEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$ted.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate ted
         * @memberOf TedController
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

                this.scope.logger.warn('Invalid Ted embed code');
                return false;
            }
        },

        /**
         * Add Ted rule
         * @memberOf TedController
         * @param e
         */
        addTedRule: function addTedRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventManager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
