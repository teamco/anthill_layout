/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePreziController(PluginBase, WidgetContentController) {

    /**
     * Define prezi controller
     * @class PreziController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PreziController = function PreziController() {
    };

    return PreziController.extend('PreziController', {

        /**
         * Set embedded content
         * @memberOf PreziController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('preziEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$prezi.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate prezi
         * @memberOf PreziController
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

                this.scope.logger.warn('Invalid Prezi embed code');
                return false;
            }
        },

        /**
         * Add Prezi rule
         * @memberOf PreziController
         * @param e
         */
        addPreziRule: function addPreziRule(e) {

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
