/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineHowcastController(PluginBase, WidgetContentController) {

    /**
     * Define howcast controller
     * @class HowcastController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var HowcastController = function HowcastController() {
    };

    return HowcastController.extend('HowcastController', {

        /**
         * Set embedded content
         * @member HowcastController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('howcastEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$howcast.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate howcast
         * @member HowcastController
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

            if (embed.match(/<object/)) {

                return $(embed).find('object');

            } else {

                this.scope.logger.warn('Invalid Howcast embed code');
                return false;
            }
        },

        /**
         * Add Howcast rule
         * @member HowcastController
         * @param e
         */
        addHowcastRule: function addHowcastRule(e) {

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
