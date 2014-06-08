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
     * @example Urls: http://pehaa.com/wp-content/uploads/2012/02/tut_pinkonhead/images/flo3.jpg,http://pehaa.com/wp-content/uploads/2012/02/tut_pinkonhead/images/lights1.jpg,http://pehaa.com/wp-content/uploads/2012/02/tut_pinkonhead/images/flo2.jpg,http://pehaa.com/wp-content/uploads/2012/02/tut_pinkonhead/images/lights3.jpg
     * @example Texts: Spring flowers,City lights,Spring flowers,City lights
     */
    var ImageGalleryElement = function ImageGalleryElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('image.gallery', {resource: '/widgets'});

        this.attachStatisticsCollector();

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
            var urls = url.split(','),
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

            this.$.parent().css('background', 'transparent');
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
        },

        attachStatisticsCollector : function attachStatisticsCollector() {

            this.$.on('click.statistics',function clickStatisticsCallback(e) {
                this.view.scope.observer.publish(
                    this.view.scope.eventmanager.eventList.bindStatistics,
                    e
                );
            }.bind(this))
        }

    }, BaseElement.prototype);

});