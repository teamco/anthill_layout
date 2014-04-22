/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineRssController(PluginBase, WidgetContentController) {

    /**
     * Define youtube controller
     * @class RssController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var RssController = function RssController() {
    };

    return RssController.extend('RssController', {

        /**
         * Set embedded content
         * @member RssController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$rss.renderEmbeddedContent(
                this.model.getPrefs('rssFeedUrl')
            );
        },

        /**
         * Parse RSS
         * @member RssController
         * @param {string} url
         * @param {function} callback
         */
        parseRSS: function parseRSS(url, callback) {

            if (!this.base.isUrl(url + '')) {
                this.logger.warn('The specified feed URL is invalid', url);
                return false;
            }

            $.ajax({
                url: [
                    window.location.protocol,
                    this.model.getConfig('googleAPIUrl'),
                    encodeURIComponent(url)
                ].join(''),
                dataType: 'json',
                success: callback
            });
        },

        /**
         * Add Rss rule
         * @member RssController
         * @param e
         */
        addRssRule: function addRssRule(e) {

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