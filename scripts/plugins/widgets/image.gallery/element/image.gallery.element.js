/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineImageGalleryElement(BaseElement) {

    /**
     * Define ImageGallery Element
     * @param view
     * @param opts
     * @returns {ImageGalleryElement}
     * @constructor
     * @class ImageGalleryElement
     * @extends BaseElement
     */
    var ImageGalleryElement = function ImageGalleryElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('image.gallery', {resource: '/widgets'});

        return this;
    };

    return ImageGalleryElement.extend('ImageGalleryElement', {

        /**
         * Render Embedded content
         * @member ImageGalleryElement
         * @param {string} url
         * @param {string} text
         */
        renderEmbeddedContent: function renderEmbeddedContent(url, text) {

            if (!url) {
                return false;
            }

            /**
             * Define this
             * @type {ImageGalleryElement}
             */
            var imageGalleryElement = this,
                urls = url.split(','),
                texts = text.split(',');

            /**
             * Define slider container
             * @type {*|jQuery}
             */
            var $ul = $('<ul />').attr({
                id: 'image.gallery-carousel'
            }).addClass('elastislide-list');

            for (var i = 0, l = urls.length; i < l; i++) {

                this.preloadImage(
                    url, $ul, urls[i], texts[i]
                );
            }

            /**
             * Define embedded template
             * @type {string}
             */
            this.setHtml($ul);
        },

        /**
         * Preload image
         * @member ImageGalleryElement
         * @param {string} url
         * @param $ul
         * @param {string} url
         * @param {string} text
         */
        preloadImage: function preloadImage(url, $ul, url, text) {

            /**
             * Define image
             * @type {Image}
             */
            var img = new Image();

            /**
             * Set url
             * @type {string}
             */
            img.src = url;

            // fix cross-origin error
            img.crossOrigin = "Anonymous";

            /**
             * Preload callback
             * @type {function}
             */
            img.onload = function preloadCallback() {

                var $img = $('<img />').attr({
                    src: url,
                    alt: text
                });

                $ul.append(
                    $('<li />').append([
                        $img, $('<div />').text(text)
                    ])
                );

            };

            /**
             * On error
             * @type {function}
             */
            img.onerror = function onerror(e) {
                this.view.scope.logger.warn('Error loading image', e);
            }.bind(this)
        }

    }, BaseElement.prototype);

});