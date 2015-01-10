/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineMyWorldController(PluginBase, WidgetContentController) {

    /**
     * Define myworld controller
     * @class MyWorldController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var MyWorldController = function MyWorldController() {
    };

    return MyWorldController.extend('MyWorldController', {

        /**
         * Set embedded content
         * @member MyWorldController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('myworldEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$myworld.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate myworld
         * @member MyWorldController
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

                this.scope.logger.warn('Invalid MyWorld embed code');
                return false;
            }
        },

        /**
         * Add MyWorld rule
         * @member MyWorldController
         * @param e
         */
        addMyWorldRule: function addMyWorldRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
