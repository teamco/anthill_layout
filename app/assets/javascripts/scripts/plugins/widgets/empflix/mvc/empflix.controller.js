/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineEmpflixController(PluginBase, WidgetContentController) {

    /**
     * Define empflix controller
     * @class EmpflixController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EmpflixController = function EmpflixController() {
    };

    return EmpflixController.extend('EmpflixController', {

        /**
         * Set embedded content
         * @member EmpflixController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('empflixEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$empflix.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate empflix
         * @member EmpflixController
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

                return this.scope.view.locateElement(
                    $(embed), 'iframe'
                ).src;

            } else {

                this.scope.logger.warn('Invalid Empflix embed code');
                return false;
            }
        },

        /**
         * Add Empflix rule
         * @member EmpflixController
         * @param e
         */
        addEmpflixRule: function addEmpflixRule(e) {

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
