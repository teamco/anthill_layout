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
         * Converts an image to
         * a base64 string.
         *
         * If you want to use the
         * outputFormat or quality param
         * I strongly recommend you read the docs
         * @ mozilla for `canvas.toDataURL()`
         *
         * @param 	{String} 	url
         * @param 	{Function}	callback
         * @param 	{String}	[outputFormat='image/png']
         * @param 	{float}   	[quality=0.0 to 1.0]
         * @url 	https://gist.github.com/HaNdTriX/7704632/
         * @docs 	https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement#Methods
         * @author 	HaNdTriX
         * @example
         * 			toDataURL('http://goo.gl/AOxHAL', function(err, base64Img){
         * 				console.log('IMAGE:',base64Img);
         * 			})
         */
        toDataURL: function toDataURL(url, callback, outputFormat, quality) {
            var canvas = document.createElement('CANVAS'),
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
        }
    });

    return new BaseImage();
});
