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

        /**
         * Define element
         * @type {boolean}
         */
        this.image = true;

        return this;
    };

    return ImageElement.extend('ImageElement', {

        /**
         * Render Embedded content
         * @member ImageElement
         * @param {string} url
         * @param {string} text
         * @param {boolean} repeatX
         * @param {boolean} repeatY
         */
        renderEmbeddedContent: function renderEmbeddedContent(url, text, repeatX, repeatY) {

            if (!url) {
                return false;
            }

            /**
             * Define bg repeat
             * @type {string}
             */
            var repeat = 'no-repeat';

            if (repeatX) {
                repeat = 'repeat-x';
                this.image = false;
            }

            if (repeatY) {
                repeat = 'repeat-y';
                this.image = false;
            }

            if (repeatX && repeatY) {
                repeat = 'repeat';
                this.image = false;
            }

            if (this.image) {

                /**
                 * Define $img
                 * @type {*|jQuery}
                 */
                this.$img = $('<img />').attr({
                    src: url,
                    alt: text,
                    title: text
                });

                this.setHtml(this.$img);

            } else {

                this.$.css({
                    backgroundImage: "url('" + url + "')",
                    backgroundRepeat: repeat
                });
            }

            this.view.controller.clearParentThumbnail();
        },

        /**
         * Bind stats
         * @member ImageElement
         */
        bindStatsCollector: function bindStatsCollector() {

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