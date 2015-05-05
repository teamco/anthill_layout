/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTimeToastController(PluginBase, WidgetContentController) {

    /**
     * Define timetoast controller
     * @class TimeToastController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TimeToastController = function TimeToastController() {
    };

    return TimeToastController.extend('TimeToastController', {

        /**
         * Set embedded content
         * @memberOf TimeToastController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('timetoastEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$timetoast.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate timetoast
         * @memberOf TimeToastController
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

                return $(embed)[0];

            } else {

                this.scope.logger.warn('Invalid TimeToast embed code');
                return false;
            }
        },

        /**
         * Add TimeToast rule
         * @memberOf TimeToastController
         * @param e
         */
        addTimeToastRule: function addTimeToastRule(e) {

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
