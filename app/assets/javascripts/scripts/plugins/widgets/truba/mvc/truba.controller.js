/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineTrubaController(PluginBase, WidgetContentController) {

    /**
     * Define truba controller
     * @class TrubaController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var TrubaController = function TrubaController() {
    };

    return TrubaController.extend('TrubaController', {

        /**
         * Set embedded content
         * @member TrubaController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('trubaUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$truba.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate truba
         * @member TrubaController
         * @param {string} url
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(url) {

            if (!url) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            // Convert to string
            url += '';

            if (url.match(/iframe/)) {
                url = $(url).attr('src');
            }

            var mask = this.model.getConfig('mask'),
                regex = url.match(
                    this.model.getConfig('regex')
                );

            if (!regex || url.match(/^\[/)) {
                this.scope.logger.warn('Invalid Truba url');
                return false;
            }

            return mask.replace(/\{id}/g, regex[0]);
        },

        /**
         * Add Truba rule
         * @member TrubaController
         * @param e
         */
        addTrubaRule: function addTrubaRule(e) {

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
