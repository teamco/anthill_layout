/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineIssuuController(PluginBase, WidgetContentController) {

    /**
     * Define issuu controller
     * @class IssuuController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var IssuuController = function IssuuController() {
    };

    return IssuuController.extend('IssuuController', {

        /**
         * Set embedded content
         * @member IssuuController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('issuuEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$issuu.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate issuu
         * @member IssuuController
         * @param {string} embed
         * @return {object|boolean}
         */
        getEmbedCode: function getEmbedCode(embed) {

            if (!embed) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            // Convert to string
            embed += '';

            if (embed.match(/^<iframe/)) {

                return {
                    type: 'iframe',
                    code: $(embed).attr('src')
                };

            } else if (embed.match(/issuuembed/)) {

                return {
                    type: 'embed',
                    code: embed
                };

            } else {

                this.scope.logger.warn('Invalid Issuu embed code');
                return false;
            }
        },

        /**
         * Add Issuu rule
         * @member IssuuController
         * @param e
         */
        addIssuuRule: function addIssuuRule(e) {

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
