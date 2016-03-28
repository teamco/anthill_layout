/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineTelekanalUaController(PluginBase, WidgetContentController) {

    /**
     * Define telekanalua controller
     * @class TelekanalUaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TelekanalUaController = function TelekanalUaController() {
    };

    return TelekanalUaController.extend('TelekanalUaController', {

        /**
         * Set embedded content
         * @memberOf TelekanalUaController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('telekanaluaUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$telekanalua.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate telekanalua
         * @memberOf TelekanalUaController
         * @param {string} url
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(url) {

            if (!url) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            // Convert to string
            url += '';

            if (url.match(/iframe/)) {
                return $(url).attr('src');
            }
        },

        /**
         * Add TelekanalUa rule
         * @memberOf TelekanalUaController
         * @param e
         */
        addTelekanalUaRule: function addTelekanalUaRule(e) {

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
