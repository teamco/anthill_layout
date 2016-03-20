/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineWorkspaceElement(BaseElement) {

    /**
     * Define Workspace Element
     * @param {WorkspaceView} view
     * @param opts
     * @returns {*}
     * @constructor
     * @class WorkspaceElement
     * @extends BaseElement
     */
    var WorkspaceElement = function Workspace(view, opts) {
        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container
        });
    };

    return WorkspaceElement.extend('WorkspaceElement', {

        /**
         * Get site author
         * @memberOf WorkspaceElement
         * @returns {string}
         */
        getSiteAuthor: function getSiteAuthor() {
            return $('meta[name="author"]').attr('content');
        },

        /**
         * Set site author
         * @memberOf WorkspaceElement
         * @param {string} author
         */
        setSiteAuthor: function setSiteAuthor(author) {
            $('meta[name="author"]').attr('content', author);
        },

        /**
         * Get site title
         * @memberOf WorkspaceElement
         * @returns {string}
         */
        getSiteTitle: function getSiteTitle() {
            return $('title').text();
        },

        /**
         * Set site title
         * @memberOf WorkspaceElement
         * @param {string} title
         */
        setSiteTitle: function setSiteTitle(title) {
            $('title').text(title);
        },

        /**
         * Set workspace width
         * @memberOf WorkspaceElement
         * @param {number} width
         */
        updateWidth: function updateWidth(width) {

            if (typeof(width) !== 'number') {
                return false;
            }

            var style = this.$.attr('class'),
                regex = /sw-\d{1,2}/;

            style = style.match(regex) ?
                style.replace(regex, 'sw-' + width) :
                style + ' sw-' + width;

            this.$.attr('class', style);
        },

        /**
         * Unset workspace width
         * @memberOf WorkspaceElement
         */
        unsetWidth: function unserWidth() {
            this.$.attr(
                'class',
                this.$.attr('class').replace(/sw-\d{1,2}/, '')
            );
        },

        /**
         * Define active page
         * @memberOf WorkspaceElement
         * @param {{Page}} items
         * @param {Page} item
         */
        defineActivePage: function defineActivePage(items, item) {

            var index, page;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Get page
                     * @type {Page}
                     */
                    page = items[index];

                    if (page !== item) {
                        page.view.get$item().setVisibility(false);
                    }
                }
            }

            item.view.get$item().setVisibility(true);
        },

        /**
         * Render Google Analytics
         * @memberOf WorkspaceElement
         * @param {string} trackingId
         */
        renderGoogleAnalytics: function renderGoogleAnalytics(trackingId) {

            window._gaq = window._gaq || [];
            window._gaq.push(['_setAccount', trackingId]);
            window._gaq.push(['_trackPageview']);

            (function () {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();
        }

    }, BaseElement.prototype);
});