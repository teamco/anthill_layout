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
                $ul.append(
                    $('<li />').append(
                        $('<a />').attr({
                            href: 'javascript:void(0)',
                            title: texts[i]
                        }).append([
                            $('<img />').attr({
                                src: urls[i],
                                alt: texts[i]
                            }),
                            $('<div />').text(texts[i])
                        ])
                    )
                );
            }

            /**
             * Define embedded template
             * @type {string}
             */
            this.setHtml($ul);

            $('img', $ul).each(function () {
                imageGalleryElement.createCanvas(this);
            });

        },

        /**
         * Preload images
         * @member ImageGalleryElement
         */
        preloadImages:function preloadImages() {
            // TODO
        },

        /**
         * Create Canvas
         * @member ImageGalleryElement
         * @example Urls: http://pehaa.com/wp-content/uploads/2012/02/tut_pinkonhead/images/flo3.jpg,http://pehaa.com/wp-content/uploads/2012/02/tut_pinkonhead/images/lights1.jpg,http://pehaa.com/wp-content/uploads/2012/02/tut_pinkonhead/images/flo2.jpg,http://pehaa.com/wp-content/uploads/2012/02/tut_pinkonhead/images/lights3.jpg
         * @example Texts: Spring flowers,City lights,Spring flowers,City lights
         */
        createCanvas: function createCanvas(image) {

            var canvas = document.createElement('canvas');
            if (canvas.getContext) {
                var ctx = canvas.getContext("2d");

                // specify canvas size
                canvas.width = image.width;
                canvas.height = image.height;

                // Once we have a reference to the source image object we can use the drawImage(reference, x, y) method to render it to the canvas.
                //x, y are the coordinates on the target canvas where the image should be placed.
                ctx.drawImage(image, 0, 0);

                // Taking the image data and storing it in the imageData array. You can read the pixel data on a canvas using the getImageData() method. Image data includes the colour of the pixel (decimal, rgb values) and transparency (alpha value). Each color component is represented by an integer between 0 and 255. imageData.da contains height x width x 4 bytes of data, with index values ranging from 0 to (height x width x 4)-1.
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
                    pixelData = imageData.data;

                // Loop through all the pixels in the imageData array, and modify
                // the red, green, and blue color values.
                for (var y = 0; y < canvas.height; y++) {
                    for (var x = 0; x < canvas.width; x++) {

                        // You can access the color values of the (x,y) pixel as follows :
                        var i = (y * 4 * canvas.width) + (x * 4);

                        // Get the RGB values.
                        var red = pixelData[i];
                        var green = pixelData[i + 1];
                        var blue = pixelData[i + 2];

                        // Convert to grayscale. One of the formulas of conversion (e.g. you could try a simple average (red+green+blue)/3)
                        var grayScale = (red * 0.3) + (green * 0.59) + (blue * .11);

                        pixelData[i] = grayScale;
                        pixelData[i + 1] = grayScale;
                        pixelData[i + 2] = grayScale;
                    }
                }

                // Putting the modified imageData back on the canvas.
                ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);

                // Inserting the canvas in the DOM, before the image:
                image.parentNode.insertBefore(canvas, image);
            }
        }

    }, BaseElement.prototype);

});