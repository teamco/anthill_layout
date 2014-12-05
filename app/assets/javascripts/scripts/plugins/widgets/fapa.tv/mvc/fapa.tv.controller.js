/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineFapaTvController(PluginBase, WidgetContentController) {

    /**
     * Define fapatv controller
     * @class FapaTvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FapaTvController = function FapaTvController() {
    };

    return FapaTvController.extend('FapaTvController', {

        /**
         * Set embedded content
         * @member FapaTvController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('fapatvEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$fapatv.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate fapatv
         * @member FapaTvController
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

                this.scope.logger.warn('Invalid FapaTv embed code');
                return false;
            }
        },

        /**
         * Add FapaTv rule
         * @member FapaTvController
         * @param e
         */
        addFapaTvRule: function addFapaTvRule(e) {

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
