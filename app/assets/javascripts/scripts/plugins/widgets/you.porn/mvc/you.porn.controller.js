/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineYouPornController(PluginBase, WidgetContentController) {

    /**
     * Define youporn controller
     * @class YouPornController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var YouPornController = function YouPornController() {
    };

    return YouPornController.extend('YouPornController', {

        /**
         * Set embedded content
         * @member YouPornController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('youpornEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$youporn.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate youporn
         * @member YouPornController
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

                this.scope.logger.warn('Invalid YouPorn embed code');
                return false;
            }
        },

        /**
         * Add YouPorn rule
         * @member YouPornController
         * @param e
         */
        addYouPornRule: function addYouPornRule(e) {

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
