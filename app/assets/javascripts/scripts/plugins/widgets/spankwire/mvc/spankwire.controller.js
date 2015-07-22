/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineSpankwireController(PluginBase, WidgetContentController) {

    /**
     * Define spankwire controller
     * @class SpankwireController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var SpankwireController = function SpankwireController() {
    };

    return SpankwireController.extend('SpankwireController', {

        /**
         * Set embedded content
         * @memberOf SpankwireController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('spankwireEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$spankwire.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate spankwire
         * @memberOf SpankwireController
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

                this.scope.logger.warn('Invalid Spankwire embed code');
                return false;
            }
        },

        /**
         * Add Spankwire rule
         * @memberOf SpankwireController
         * @param e
         */
        addSpankwireRule: function addSpankwireRule(e) {

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
