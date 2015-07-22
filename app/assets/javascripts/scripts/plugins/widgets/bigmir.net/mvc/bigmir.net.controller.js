/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineBigmirNetController(PluginBase, WidgetContentController) {

    /**
     * Define bigmirnet controller
     * @class BigmirNetController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var BigmirNetController = function BigmirNetController() {
    };

    return BigmirNetController.extend('BigmirNetController', {

        /**
         * Set embedded content
         * @memberOf BigmirNetController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('bigmirnetEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$bigmirnet.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate bigmirnet
         * @memberOf BigmirNetController
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

                this.scope.logger.warn('Invalid BigmirNet embed code');
                return false;
            }
        },

        /**
         * Add BigmirNet rule
         * @memberOf BigmirNetController
         * @param e
         */
        addBigmirNetRule: function addBigmirNetRule(e) {

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
