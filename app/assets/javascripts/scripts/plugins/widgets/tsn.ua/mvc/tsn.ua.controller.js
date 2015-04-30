/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTsnUaController(PluginBase, WidgetContentController) {

    /**
     * Define tsnua controller
     * @class TsnUaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TsnUaController = function TsnUaController() {
    };

    return TsnUaController.extend('TsnUaController', {

        /**
         * Set embedded content
         * @memberOf TsnUaController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('tsnuaEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$tsnua.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate tsnua
         * @memberOf TsnUaController
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

            if (embed.match(/^<embed/)) {

                return embed;

            } else {

                this.scope.logger.warn('Invalid TsnUa embed code');
                return false;
            }
        },

        /**
         * Add TsnUa rule
         * @memberOf TsnUaController
         * @param e
         */
        addTsnUaRule: function addTsnUaRule(e) {

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
