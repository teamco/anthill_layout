/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineScreenrController(PluginBase, WidgetContentController) {

    /**
     * Define screenr controller
     * @class ScreenrController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ScreenrController = function ScreenrController() {
    };

    return ScreenrController.extend('ScreenrController', {

        /**
         * Set embedded content
         * @memberOf ScreenrController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('screenrEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$screenr.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate screenr
         * @memberOf ScreenrController
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

                this.scope.logger.warn('Invalid Screenr embed code');
                return false;
            }
        },

        /**
         * Add Screenr rule
         * @memberOf ScreenrController
         * @param {Event} e
         */
        addScreenrRule: function addScreenrRule(e) {

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
