/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineRevisionController(PluginBase, WidgetContentController) {

    /**
     * Define revision controller
     * @class RevisionController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var RevisionController = function RevisionController() {
    };

    return RevisionController.extend('RevisionController', {

        /**
         * Set embedded content
         * @member RevisionController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('revisionEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$revision.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate revision
         * @member RevisionController
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

                this.scope.logger.warn('Invalid Revision embed code');
                return false;
            }
        },

        /**
         * Add Revision rule
         * @member RevisionController
         * @param e
         */
        addRevisionRule: function addRevisionRule(e) {

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