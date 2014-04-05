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
         * @param {boolean} stretch
         */
        renderEmbeddedContent: function renderEmbeddedContent(url, text, repeatX, repeatY, stretch) {

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

                if (stretch) {
                    this.$img.css({
                        width: '100%',
                        height: '100%'
                    });
                }

                this.setHtml(this.$img);

            } else {

                this.$.css({
                    backgroundImage: "url('" + url + "')",
                    backgroundRepeat: repeat,
                    backgroundSize: stretch ? 'cover' : 'auto'
                });
            }

            this.view.controller.clearParentThumbnail();
        },

        /**
         * Render Embedded content
         * @member ImageElement
         * @param {string} url
         * @param {string} text
         * @param {boolean} repeatX
         * @param {boolean} repeatY
         * @param {boolean} stretch,
         * @param {number} splitTo
         */
        renderSplitEmbeddedContent: function renderSplitEmbeddedContent(url, text, repeatX, repeatY, stretch, splitTo) {

            if (!url) {
                return false;
            }

            /**
             * Set img dimensions
             * @param e
             * @private
             */
            function _setDimensions(e) {
                this.$img.css({
                    height: '100%',
                    marginLeft: -e.target.width / splitTo
                });
            }

            /**
             * Load image
             * @type {Image}
             */
            var img = new Image();

            img.src = url;
            img.onload = _setDimensions.bind(this);
            img.onerror = function () {
                this.view.scope.logger.warn('Unable to load image', img);
            }.bind(this);
console.log(url, text)
            /**
             * Define $img
             * @type {*|jQuery}
             */
            this.$img = $('<img />').attr({
                src: img.src,
                alt: text,
                title: text
            });

            this.setHtml(this.$img);

            return false;
        },

        /**
         * Bind click
         * @member ImageElement
         * @param {string} url
         */
        bindOnClickOpenUrl: function bindOnClickOpenUrl(url) {

            this.$.on('click.openUrl', function openUrl() {
                window.open(url);
            });
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