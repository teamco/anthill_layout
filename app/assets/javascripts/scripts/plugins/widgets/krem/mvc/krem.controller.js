/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineKremController(PluginBase, WidgetContentController) {

    /**
     * Define krem controller
     * @class KremController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var KremController = function KremController() {
    };

    return KremController.extend('KremController', {

        /**
         * Set embedded content
         * @member KremController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('kremEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$krem.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate krem
         * @member KremController
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

            if (embed.match(/^<object/)) {

                return embed;

            } else {

                this.scope.logger.warn('Invalid Krem embed code');
                return false;
            }
        },

        /**
         * Add Krem rule
         * @member KremController
         * @param e
         */
        addKremRule: function addKremRule(e) {

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
