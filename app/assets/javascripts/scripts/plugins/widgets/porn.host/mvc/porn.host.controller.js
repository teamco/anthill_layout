/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePornHostController(PluginBase, WidgetContentController) {

    /**
     * Define pornhost controller
     * @class PornHostController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PornHostController = function PornHostController() {
    };

    return PornHostController.extend('PornHostController', {

        /**
         * Set embedded content
         * @memberOf PornHostController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('pornhostEmbedCode'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$pornhost.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate pornhost
         * @memberOf PornHostController
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

                this.scope.logger.warn('Invalid PornHost embed code');
                return false;
            }
        },

        /**
         * Add PornHost rule
         * @memberOf PornHostController
         * @param e
         */
        addPornHostRule: function addPornHostRule(e) {

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
