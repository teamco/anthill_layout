/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineRssElement(BaseElement) {

    /**
     * Define Rss Element
     * @param view
     * @param opts
     * @returns {RssElement}
     * @constructor
     * @class RssElement
     * @extends BaseElement
     */
    var RssElement = function RssElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('rss', {resource: '/widgets'});

        return this;
    };

    return RssElement.extend('RssElement', {

        /**
         * Render Embedded content
         * @member RssElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {

            /**
             * Define scope
             * @type {Rss}
             */
            var scope = this.view.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.parseRSS,
                [url, this.updateContent.bind(this)]
            );
        },

        /**
         * Update embedded content
         * @member RssElement
         * @param {{
         *      responseData: {feed},
         *      responseDetails: string,
         *      responseStatus: number
         * }} data
         */
        updateContent: function updateContent(data) {

            /**
             * Define scope
             * @type {Rss}
             */
            var scope = this.view.scope;

            if (!data.responseData) {
                scope.logger.warn(data);
                return false;
            }

            console.log(data.responseData.feed);
        }

    }, BaseElement.prototype);

});