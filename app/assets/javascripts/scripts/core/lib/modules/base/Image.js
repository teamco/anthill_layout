/**
 * Created with RubyMine.
 * User: teamco
 * Date: 11/27/14
 * Time: 9:04 PM
 */
define([], function defineLibImage() {

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
         * @memberOf   LibImage
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
         * @memberOf LibImage
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
            var img = new Image(),
                scope = this;

            // When the event "onload" is triggered we can resize the image.
            img.onload = function () {

                if (this.width === width && this.height === height) {
                    callback(null, data);
                    return false;
                }

                // We create a canvas and get its context.
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    dataURL;

                // this produces lanczos3
                // but feel free to raise it up to 8. Your client will appreciate
                // that the program makes full use of his machine.
                // new scope.Thumbnailer(scope, canvas, this, width, 5);

                //// We set the dimensions at the wanted size.
                canvas.width = width;
                canvas.height = height;

                try {
                    // We resize the image with the canvas method drawImage();
                    ctx.drawImage(this, 0, 0, width, height);
                    dataURL = canvas.toDataURL('image/png', 1.0);
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
        },

        //returns a function that calculates lanczos weight
        lanczosCreate: function lanczosCreate(lobes) {
            return function (x) {
                if (x > lobes)
                    return 0;
                x *= Math.PI;
                if (Math.abs(x) < 1e-16)
                    return 1
                var xx = x / lobes;
                return Math.sin(x) * Math.sin(xx) / x / xx;
            }
        },

        //elem: canvas element, img: image element, sx: scaled width, lobes: kernel radius
        Thumbnailer: function Thumbnailer(scope, elem, img, sx, lobes) {
            this.canvas = elem;
            elem.width = img.width;
            elem.height = img.height;
            elem.style.display = "none";
            this.ctx = elem.getContext("2d");
            this.ctx.drawImage(img, 0, 0);
            this.img = img;
            this.src = this.ctx.getImageData(0, 0, img.width, img.height);
            this.dest = {
                width: sx,
                height: Math.round(img.height * sx / img.width),
            };
            this.dest.data = new Array(this.dest.width * this.dest.height * 3);
            this.lanczos = scope.lanczosCreate(lobes);
            this.ratio = img.width / sx;
            this.rcp_ratio = 2 / this.ratio;
            this.range2 = Math.ceil(this.ratio * lobes / 2);
            this.cacheLanc = {};
            this.center = {};
            this.icenter = {};
            setTimeout(this.process1, 0, this, 0);
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

            require(['html2canvas'], function () {
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

        //name: Hermite resize
        //about: Fast image resize/resample using Hermite filter with JavaScript.
        //demo: http://viliusle.github.io/miniPaint/
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

    /**
     * Init base image
     * @type {LibImage}
     * @private
     */
    var _baseImg = new LibImage();

    /**
     * Define process1
     * @param scope
     * @param u
     */
    _baseImg.Thumbnailer.prototype.process1 = function process1(scope, u) {
        scope.center.x = (u + 0.5) * scope.ratio;
        scope.icenter.x = Math.floor(scope.center.x);
        for (var v = 0; v < scope.dest.height; v++) {
            scope.center.y = (v + 0.5) * scope.ratio;
            scope.icenter.y = Math.floor(scope.center.y);
            var a, r, g, b, idx;
            a = r = g = b = 0;
            for (var i = scope.icenter.x - scope.range2; i <= scope.icenter.x + scope.range2; i++) {
                if (i < 0 || i >= scope.src.width)
                    continue;
                var f_x = Math.floor(1000 * Math.abs(i - scope.center.x));
                if (!scope.cacheLanc[f_x])
                    scope.cacheLanc[f_x] = {};
                for (var j = scope.icenter.y - scope.range2; j <= scope.icenter.y + scope.range2; j++) {
                    if (j < 0 || j >= scope.src.height)
                        continue;
                    var f_y = Math.floor(1000 * Math.abs(j - scope.center.y));
                    if (scope.cacheLanc[f_x][f_y] == undefined)
                        scope.cacheLanc[f_x][f_y] = scope.lanczos(Math.sqrt(Math.pow(f_x * scope.rcp_ratio, 2) + Math.pow(f_y * scope.rcp_ratio, 2)) / 1000);
                    weight = scope.cacheLanc[f_x][f_y];
                    if (weight > 0) {
                        idx = (j * scope.src.width + i) * 4;
                        a += weight;
                        r += weight * scope.src.data[idx];
                        g += weight * scope.src.data[idx + 1];
                        b += weight * scope.src.data[idx + 2];
                    }
                }
            }
            idx = (v * scope.dest.width + u) * 3;
            scope.dest.data[idx] = r / a;
            scope.dest.data[idx + 1] = g / a;
            scope.dest.data[idx + 2] = b / a;
        }

        if (++u < scope.dest.width)
            setTimeout(scope.process1, 0, scope, u);
        else
            setTimeout(scope.process2, 0, scope);
    };

    /**
     * Define process2
     * @param scope
     */
    _baseImg.Thumbnailer.prototype.process2 = function process2(scope) {
        scope.canvas.width = scope.dest.width;
        scope.canvas.height = scope.dest.height;
        scope.ctx.drawImage(scope.img, 0, 0);
        scope.src = scope.ctx.getImageData(0, 0, scope.dest.width, scope.dest.height);
        var idx, idx2;
        for (var i = 0; i < scope.dest.width; i++) {
            for (var j = 0; j < scope.dest.height; j++) {
                idx = (j * scope.dest.width + i) * 3;
                idx2 = (j * scope.dest.width + i) * 4;
                scope.src.data[idx2] = scope.dest.data[idx];
                scope.src.data[idx2 + 1] = scope.dest.data[idx + 1];
                scope.src.data[idx2 + 2] = scope.dest.data[idx + 2];
            }
        }
        scope.ctx.putImageData(scope.src, 0, 0);
        scope.canvas.style.display = "block";
    };

    return _baseImg;
});
