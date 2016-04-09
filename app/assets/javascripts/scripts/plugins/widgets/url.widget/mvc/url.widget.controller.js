/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineUrlWidgetController(PluginBase, WidgetContentController) {

    /**
     * Define UrlWidget controller
     * @class UrlWidgetController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var UrlWidgetController = function UrlWidgetController() {
    };

    return UrlWidgetController.extend('UrlWidgetController', {

        /**
         * Set embedded content
         * @memberOf UrlWidgetController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            // Get prefs
            var url = this.model.getPrefs('urlwidgetUrlResource'),
                isIframe = this.model.getPrefs('urlwidgetShowInIframe');

            this.view.get$item().renderEmbeddedContent(
                url, isIframe
            );
        },

        /**
         * Fetch readability content
         * @memberOf UrlWidgetController
         * @param {string} url
         */
        fetchReadability: function fetchReadability(url) {

            /**
             * Get scope
             * @type {UrlWidget|string}
             */
            var scope = this.scope,
                encodedUrl = scope.base.lib.string.base64.encode(url);

            if (scope.cachedContent && scope.cachedContent.length) {
                return scope.controller.getCachedContent();
            }

            $.get(
                '/readability_content/' + encodedUrl,
                function _getCallback(content) {
                    scope.controller.setCachedContent(content);
                    scope.view.get$item().updateEmbeddedContent(content);
                }
            );
        },

        /**
         * Get cached content
         * @memberOf UrlWidgetController
         * @returns {string}
         */
        getCachedContent: function getCachedContent() {
            return this.scope.cachedContent;
        },

        /**
         * Update cached content
         * @param {string} content
         */
        setCachedContent: function setCachedContent(content) {

            /**
             * Update cached content
             * @type {string}
             */
            this.scope.cachedContent = content;
        },

        /**
         * Add UrlWidget rule
         * @memberOf UrlWidgetController
         * @param e
         */
        addUrlWidgetRule: function addUrlWidgetRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {UrlWidget|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
