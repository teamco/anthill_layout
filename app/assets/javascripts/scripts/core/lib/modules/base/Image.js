/**
 * Created with RubyMine.
 * User: teamco
 * Date: 11/27/14
 * Time: 9:04 PM
 */
define(function defineLibImage() {

    /**
     * Define LibImage
     * @class LibImage
     * @constructor
     */
    var LibImage = function LibImage() {
    };

    LibImage.extend('LibImage', {

        /**
         * Converts an image to a base64 string.
         * If you want to use the outputFormat or quality param
         * I strongly recommend you read the docs
         * @ mozilla for `canvas.toDataURL()`
         *
         * @memberOf LibImage
         * @param    {String}   url
         * @param    {Function} callback
         * @param    {String}   [outputFormat='image/png']
         * @param    {float}    [quality=0.0 to 1.0]
         * @url      https://gist.github.com/HaNdTriX/7704632/
         * @docs     https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement#Methods
         * @author   HaNdTriX
         * @example
         *  toDataURL('http://goo.gl/AOxHAL', function(err, base64Img){
         * 	    console.log('IMAGE:',base64Img);
         * 	})
         */
        toDataURL: function toDataURL(url, callback, outputFormat, quality) {
            
            try {
                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function _onloadCanvas() {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var dataURL;
                    canvas.height = this.height;
                    canvas.width = this.width;
                    ctx.drawImage(this, 0, 0);
                    dataURL = canvas.toDataURL(outputFormat, quality);
                    callback(dataURL);
                    canvas = null;
                };
                img.src = url;

            } catch(e) {

                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function _onloadXhr() {
                    var reader  = new FileReader();
                    reader.onloadend = function _onloadEnd() {
                        callback(reader.result);
                    };
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.send();
            }
        },

        /**
         * Resize thumbnail
         * @memberOf LibImage
         * @param domElement
         * @param {function} callback
         * @param {number} [ratio]
         */
        resizeThumbnail: function (domElement, callback, ratio) {

            /**
             * Define libImg
             * @type {LibImage}
             */
            var libImg = this;

            //resize by ratio
            ratio = ratio || 0.43895525; //from 0 to 1

            require(['html2canvas'], function (html2canvas) {
                html2canvas(
                    domElement || document.body, {
                        onrendered: function (response) {

                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');
                            var img = new Image();

                            img.crossOrigin = "Anonymous"; //cors support
                            img.onload = function () {
                                var W = img.width;
                                var H = img.height;
                                canvas.width = W;
                                canvas.height = H;
                                ctx.drawImage(img, 0, 0); //draw image

                                libImg.resampleHermite(
                                    canvas, W, H,
                                    Math.round(W * ratio),
                                    Math.round(H * ratio)
                                );
                                
                                callback(canvas.toDataURL());
                            };

                            img.src = response.toDataURL();
                        }
                    }
                );
            })
        },

        /**
         * Hermite resize
         * @memberOf LibImage
         * @description Fast image resize/resample using Hermite filter with JavaScript
         * @example http://viliusle.github.io/miniPaint/
         * @param canvas
         * @param W
         * @param H
         * @param W2
         * @param H2
         */
        resampleHermite: function resampleHermite(canvas, W, H, W2, H2) {
            //var time1 = Date.now();
            W2 = Math.round(W2);
            H2 = Math.round(H2);
            var img = canvas.getContext("2d").getImageData(0, 0, W, H);
            var img2 = canvas.getContext("2d").getImageData(0, 0, W2, H2);
            var data = img.data;
            var data2 = img2.data;
            var ratio_w = W / W2;
            var ratio_h = H / H2;
            var ratio_w_half = Math.ceil(ratio_w / 2);
            var ratio_h_half = Math.ceil(ratio_h / 2);
            var gx_a, gx_g, gx_b;

            for (var j = 0; j < H2; j++) {
                for (var i = 0; i < W2; i++) {
                    var x2 = (i + j * W2) * 4;
                    var weight = 0;
                    var weights = 0;
                    var weights_alpha = 0;
                    var gx_r = gx_g = gx_b = gx_a = 0;
                    var center_y = (j + 0.5) * ratio_h;
                    for (var yy = Math.floor(j * ratio_h); yy < (j + 1) * ratio_h; yy++) {
                        var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                        var center_x = (i + 0.5) * ratio_w;
                        var w0 = dy * dy; //pre-calc part of w
                        for (var xx = Math.floor(i * ratio_w); xx < (i + 1) * ratio_w; xx++) {
                            var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                            var w = Math.sqrt(w0 + dx * dx);
                            if (w >= -1 && w <= 1) {
                                //hermite filter
                                weight = 2 * w * w * w - 3 * w * w + 1;
                                if (weight > 0) {
                                    dx = 4 * (xx + yy * W);
                                    //alpha
                                    gx_a += weight * data[dx + 3];
                                    weights_alpha += weight;
                                    //colors
                                    if (data[dx + 3] < 255)
                                        weight = weight * data[dx + 3] / 250;
                                    gx_r += weight * data[dx];
                                    gx_g += weight * data[dx + 1];
                                    gx_b += weight * data[dx + 2];
                                    weights += weight;
                                }
                            }
                        }
                    }
                    data2[x2] = gx_r / weights;
                    data2[x2 + 1] = gx_g / weights;
                    data2[x2 + 2] = gx_b / weights;
                    data2[x2 + 3] = gx_a / weights_alpha;
                }
            }
            //console.log("hermite = " + (Math.round(Date.now() - time1) / 1000) + " s");
            canvas.getContext("2d").clearRect(0, 0, Math.max(W, W2), Math.max(H, H2));
            canvas.width = W2;
            canvas.height = H2;
            canvas.getContext("2d").putImageData(img2, 0, 0);
        }
    });

    return new LibImage();
});
