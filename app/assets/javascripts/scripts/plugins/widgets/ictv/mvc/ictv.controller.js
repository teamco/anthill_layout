/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineIctvController(PluginBase, WidgetContentController) {

    /**
     * Define ictv controller
     * @class IctvController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var IctvController = function IctvController() {
    };

    return IctvController.extend('IctvController', {

        /**
         * Set embedded content
         * @memberOf IctvController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var embed = this.controller.getEmbedCode(
                this.model.getPrefs('ictvEmbedCode')
            );

            if (embed) {
                this.view.elements.$ictv.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate ictv
         * @memberOf IctvController
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

                return $(embed).find('param[name="flashvars"]').attr('value');

            } else {

                this.scope.logger.warn('Invalid Ictv embed code');
                return false;
            }
        },

        /**
         * Add Ictv rule
         * @memberOf IctvController
         * @param e
         */
        addIctvRule: function addIctvRule(e) {

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
