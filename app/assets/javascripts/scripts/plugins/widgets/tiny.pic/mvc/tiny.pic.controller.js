/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTinyPicController(PluginBase, WidgetContentController) {

    /**
     * Define tinypic controller
     * @class TinyPicController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TinyPicController = function TinyPicController() {
    };

    return TinyPicController.extend('TinyPicController', {

        /**
         * Set embedded content
         * @memberOf TinyPicController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$tinypic.renderEmbeddedContent(
                this.controller.getEmbedCode(
                    this.model.getPrefs('tinypicEmbedCode')
                )
            );
        },

        /**
         * Validate tiny pic
         * @memberOf TinyPicController
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

            if (embed.match(/^<embed/)) {

                return {
                    type: 'embed',
                    code: embed
                };

            } else if (embed.match(/^<a/)) {

                return {
                    type: 'image',
                    code: embed
                };

            } else {

                this.scope.logger.warn('Invalid TsnUa embed code');
                return false;
            }
        },

        /**
         * Add TinyPic rule
         * @memberOf TinyPicController
         * @param e
         */
        addTinyPicRule: function addTinyPicRule(e) {

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
