/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTwentyFourVideoController(PluginBase, WidgetContentController) {

    /**
     * Define twentyfourvideo controller
     * @class TwentyFourVideoController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TwentyFourVideoController = function TwentyFourVideoController() {
    };

    return TwentyFourVideoController.extend('TwentyFourVideoController', {

        /**
         * Set embedded content
         * @memberOf TwentyFourVideoController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('twentyfourvideoEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$twentyfourvideo.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate twentyfourvideo
         * @memberOf TwentyFourVideoController
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

                this.scope.logger.warn('Invalid TwentyFourVideo embed code');
                return false;
            }
        },

        /**
         * Add TwentyFourVideo rule
         * @memberOf TwentyFourVideoController
         * @param e
         */
        addTwentyFourVideoRule: function addTwentyFourVideoRule(e) {

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
