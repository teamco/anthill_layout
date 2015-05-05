/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePastebinController(PluginBase, WidgetContentController) {

    /**
     * Define pastebin controller
     * @class PastebinController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PastebinController = function PastebinController() {
    };

    return PastebinController.extend('PastebinController', {

        /**
         * Set embedded content
         * @memberOf PastebinController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('pastebinEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$pastebin.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate pastebin
         * @memberOf PastebinController
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

                this.scope.logger.warn('Invalid Pastebin embed code');
                return false;
            }
        },

        /**
         * Add Pastebin rule
         * @memberOf PastebinController
         * @param e
         */
        addPastebinRule: function addPastebinRule(e) {

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
