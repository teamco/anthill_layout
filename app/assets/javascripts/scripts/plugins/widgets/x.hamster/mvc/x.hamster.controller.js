/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineXHamsterController(PluginBase, WidgetContentController) {

    /**
     * Define XHamster controller
     * @class XHamsterController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var XHamsterController = function XHamsterController() {
    };

    return XHamsterController.extend('XHamsterController', {

        /**
         * Set embedded content
         * @member XHamsterController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get url
             * @type {string|*}
             */
            var url = this.model.getPrefs('xhamsterUrl'),
                embed = this.controller.getEmbedCode(url);

            if (embed) {
                this.view.elements.$xhamster.renderEmbeddedContent(embed);
            }
        },

        /**
         * Validate xHamster
         * @member XHamsterController
         * @param {string} url
         * @return {string|boolean}
         */
        getEmbedCode: function getEmbedCode(url) {

            // Convert to string
            url += '';

            if (!url) {
                this.scope.logger.debug('Initial state');
                return false;
            }

            if (url.match(/iframe/)) {
                url = $(url).attr('src');
            }

            var mask = this.model.getConfig('mask'),
                regex = url.match(
                    this.model.getConfig('regex')
                );

            if (!regex) {
                this.scope.logger.warn('Invalid xHamster url');
                return false;
            }

            return mask.replace(/\{id}/g, regex[0]);
        },

        /**
         * Add XHamster rule
         * @member XHamsterController
         * @param e
         */
        addXHamsterRule: function addXHamsterRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
