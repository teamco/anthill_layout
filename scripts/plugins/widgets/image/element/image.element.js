/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineImageElement(BaseElement) {

    /**
     * Define Image Element
     * @param view
     * @param opts
     * @returns {ImageElement}
     * @constructor
     * @class ImageElement
     * @extends BaseElement
     */
    var ImageElement = function ImageElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('image', {resource: '/widgets'});
        this.bindStatsCollector();

        return this;
    };

    return ImageElement.extend('ImageElement', {

        /**
         * Render Embedded content
         * @member ImageElement
         * @param {string} url
         * @param {string} text
         * @param {number} [splitTo]
         * @param {number} [index]
         */
        renderEmbeddedContent: function renderEmbeddedContent(url, text, splitTo, index) {

            if (!url) {
                return false;
            }

            /**
             * Define embedded template
             * @type {string}
             */
            this.setHtml(
                $('<img />').attr({
                    src: url,
                    alt: text,
                    title: text
                })
            );
        },

        /**
         * Bins stats
         * @member ImageElement
         */
        bindStatsCollector : function bindStatsCollector() {

            function _clickPrefs(e) {

                /**
                 * Define scope
                 * @type {Image}
                 */
                var scope = this.scope;

                scope.observer.publish(
                    scope.eventmanager.eventList.provideStats,
                    e
                );
            }

            this.$.on(
                'click.statistics',
                _clickPrefs.bind(this.view)
            );
        }

    }, BaseElement.prototype);

});