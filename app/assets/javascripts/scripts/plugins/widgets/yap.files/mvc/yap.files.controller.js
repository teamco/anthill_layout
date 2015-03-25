/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineYapFilesController(PluginBase, WidgetContentController) {

    /**
     * Define yapfiles controller
     * @class YapFilesController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var YapFilesController = function YapFilesController() {
    };

    return YapFilesController.extend('YapFilesController', {

        /**
         * Set embedded content
         * @member YapFilesController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('yapfilesEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$yapfiles.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate yapfiles
         * @member YapFilesController
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

                return $(embed);

            } else {

                this.scope.logger.warn('Invalid YapFiles embed code');
                return false;
            }
        },

        /**
         * Add YapFiles rule
         * @member YapFilesController
         * @param e
         */
        addYapFilesRule: function addYapFilesRule(e) {

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
