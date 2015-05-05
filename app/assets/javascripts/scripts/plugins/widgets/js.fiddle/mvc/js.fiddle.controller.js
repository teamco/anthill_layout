/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineJsFiddleController(PluginBase, WidgetContentController) {

    /**
     * Define jsfiddle controller
     * @class JsFiddleController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var JsFiddleController = function JsFiddleController() {
    };

    return JsFiddleController.extend('JsFiddleController', {

        /**
         * Set embedded content
         * @memberOf JsFiddleController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('jsfiddleEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$jsfiddle.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate jsfiddle
         * @memberOf JsFiddleController
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

                this.scope.logger.warn('Invalid JsFiddle embed code');
                return false;
            }
        },

        /**
         * Add JsFiddle rule
         * @memberOf JsFiddleController
         * @param e
         */
        addJsFiddleRule: function addJsFiddleRule(e) {

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
