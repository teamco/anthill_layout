/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineFotoKritikController(PluginBase, WidgetContentController) {

    /**
     * Define fotokritik controller
     * @class FotoKritikController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var FotoKritikController = function FotoKritikController() {
    };

    return FotoKritikController.extend('FotoKritikController', {

        /**
         * Set embedded content
         * @memberOf FotoKritikController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('fotokritikEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$fotokritik.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate fotokritik
         * @memberOf FotoKritikController
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

                this.scope.logger.warn('Invalid FotoKritik embed code');
                return false;
            }
        },

        /**
         * Add FotoKritik rule
         * @memberOf FotoKritikController
         * @param e
         */
        addFotoKritikRule: function addFotoKritikRule(e) {

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
