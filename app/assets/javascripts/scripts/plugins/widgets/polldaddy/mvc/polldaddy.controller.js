/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePolldaddyController(PluginBase, WidgetContentController) {

    /**
     * Define polldaddy controller
     * @class PolldaddyController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PolldaddyController = function PolldaddyController() {
    };

    return PolldaddyController.extend('PolldaddyController', {

        /**
         * Set embedded content
         * @memberOf PolldaddyController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.elements.$polldaddy.renderEmbeddedContent(
                this.controller.getEmbeddedId(
                    this.model.getPrefs('polldaddyEmbedCode')
                )
            );
        },

        /**
         * Parse embedded content to extract id
         * @memberOf PolldaddyController
         * @param {string} embed
         * @returns {*}
         */
        getEmbeddedId: function getEmbeddedId(embed) {

            if (!embed) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            // Match inline embed code
            var regex = embed.match(/poll\/(\d+)/);

            if (regex) {

                return data = {
                    type: 'inline',
                    id: regex[1]
                };

            } else {

                this.scope.logger.warn('Invalid embed code');
                return false;
            }
        },

        /**
         * Add Polldaddy rule
         * @memberOf PolldaddyController
         * @param e
         */
        addPolldaddyRule: function addPolldaddyRule(e) {

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
