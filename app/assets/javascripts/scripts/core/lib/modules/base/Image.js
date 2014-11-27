/**
 * Created with RubyMine.
 * User: teamco
 * Date: 11/27/14
 * Time: 9:04 PM
 */
define([], function defineBaseImage() {

    /**
     * Define BaseImage
     * @class BaseImage
     * @constructor
     */
    var BaseImage = function BaseImage() {
    };

    BaseImage.extend('BaseImage', {


        /**
         * Converts an image to a base64 string.
         * If you want to use the outputFormat or quality param
         * I strongly recommend you read the docs
         * @ mozilla for `canvas.toDataURL()`
         *
         * @member   BaseImage
         * @param    {String}   url
         * @param    {Function} callback
         * @param    {String}   [outputFormat='image/png']
         * @param    {float}    [quality=0.0 to 1.0]
         * @url      https://gist.github.com/HaNdTriX/7704632/
         * @docs     https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement#Methods
         * @author   HaNdTriX
         * @example
         *           toDataURL('http://goo.gl/AOxHAL', function(err, base64Img){
         * 				console.log('IMAGE:',base64Img);
         * 			 })
         */
        toDataURL: function toDataURL(url, callback, outputFormat, quality) {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                try {
                    ctx.drawImage(img, 0, 0);
                    dataURL = canvas.toDataURL(outputFormat, quality);
                    callback(null, dataURL);
                } catch (e) {
                    callback(e, null);
                }
                canvas = img = null;
            };
            img.onerror = function () {
                callback(new Error('Could not load image'), null);
            };
            img.src = url;
        },

        /**
         * Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size
         * @member BaseImage
         * @param {string} data
         * @param {number} width
         * @param {number} height
         * @param {function} callback
         * @example
         *           resizeDataURL('data-uri', w, h, function(err, base64Img){
         * 				console.log('IMAGE:',base64Img);
         * 			 })
         */
        resizeDataURL: function resizeDataURL(data, width, height, callback) {

            // We create an image to receive the Data URI
            var img = new Image();

            // When the event "onload" is triggered we can resize the image.
            img.onload = function () {

                // We create a canvas and get its context.
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    dataURL;

                // We set the dimensions at the wanted size.
                canvas.width = width;
                canvas.height = height;

                // We resize the image with the canvas method drawImage();
                ctx.drawImage(this, 0, 0, width, height);

                try {
                    ctx.drawImage(img, 0, 0);
                    dataURL = canvas.toDataURL();
                    callback(null, dataURL);
                } catch (e) {
                    callback(e, null);
                }
                canvas = img = null;
            };

            img.onerror = function () {
                callback(new Error('Could not load image'), null);
            };

            // We put the Data URI in the image's src attribute
            img.src = data;
        }
    });

    return new BaseImage();
});
