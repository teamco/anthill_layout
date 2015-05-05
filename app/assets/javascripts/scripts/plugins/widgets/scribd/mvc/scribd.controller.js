/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineScribdController(PluginBase, WidgetContentController) {

    /**
     * Define scribd controller
     * @class ScribdController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ScribdController = function ScribdController() {
    };

    return ScribdController.extend('ScribdController', {

        /**
         * Set embedded content
         * @memberOf ScribdController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$scribd.renderEmbeddedContent(
                this.controller.getEmbedCode(
                    this.model.getPrefs('scribdEmbedCode')
                )
            );
        },

        /**
         * Validate scribd
         * @memberOf ScribdController
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

            if (embed.match(/<iframe/)) {

                // Locate iframe
                var $iframe = $($(embed)[1]);

                return {
                    src: $iframe.attr('src'),
                    id: $iframe.attr('id'),
                    'class': $iframe.attr('class'),
                    'data-auto-height': $iframe.attr('data-auto-height'),
                    'data-aspect-ratio': $iframe.attr('data-aspect-ratio')
                };

            } else {

                this.scope.logger.warn('Invalid Scribd embed code');
                return false;
            }
        },

        /**
         * Add Scribd rule
         * @memberOf ScribdController
         * @param e
         */
        addScribdRule: function addScribdRule(e) {

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
