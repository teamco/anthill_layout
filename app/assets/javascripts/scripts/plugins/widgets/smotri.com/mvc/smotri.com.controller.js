/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineSmotriComController(PluginBase, WidgetContentController) {

    /**
     * Define smotricom controller
     * @class SmotriComController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SmotriComController = function SmotriComController() {
    };

    return SmotriComController.extend('SmotriComController', {

        /**
         * Set embedded content
         * @memberOf SmotriComController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('smotricomEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$smotricom.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate smotricom
         * @memberOf SmotriComController
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

                /**
                 * Get $embed
                 * @type {*|jQuery|HTMLElement}
                 */
                var $embed = $(embed);

                return embed.match(/^<object/) ?
                    $embed :
                    $embed.find('object');

            } else {

                this.scope.logger.warn('Invalid SmotriCom embed code');
                return false;
            }
        },

        /**
         * Add SmotriCom rule
         * @memberOf SmotriComController
         * @param e
         */
        addSmotriComRule: function addSmotriComRule(e) {

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
