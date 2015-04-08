/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTubeEightController(PluginBase, WidgetContentController) {

    /**
     * Define tubeeight controller
     * @class TubeEightController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TubeEightController = function TubeEightController() {
    };

    return TubeEightController.extend('TubeEightController', {

        /**
         * Set embedded content
         * @memberOf TubeEightController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('tubeeightEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$tubeeight.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate tubeeight
         * @memberOf TubeEightController
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

                this.scope.logger.warn('Invalid TubeEight embed code');
                return false;
            }
        },

        /**
         * Add TubeEight rule
         * @memberOf TubeEightController
         * @param e
         */
        addTubeEightRule: function addTubeEightRule(e) {

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
