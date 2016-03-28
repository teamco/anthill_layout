/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineImageElement(PluginElement) {

    /**
     * Define Image Element
     * @constructor
     * @class ImageElement
     * @extends PluginElement
     * @param {ImageView} view
     * @param opts
     * @returns {ImageElement}
     */
    var ImageElement = function ImageElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('image', {resource: '/widgets'});

        /**
         * Define element
         * @property ImageElement
         * @type {boolean}
         */
        this.image = true;

        return this;
    };

    return ImageElement.extend('ImageElement', {

        /**
         * Render Embedded content
         * @memberOf ImageElement
         * @param {object} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            if (!opts.url) {
                return false;
            }

            /**
             * Define bg repeat
             * @type {string}
             */
            var repeat = 'no-repeat';

            if (opts.repeatX) {
                repeat = 'repeat-x';
                this.image = false;
            }

            if (opts.repeatY) {
                repeat = 'repeat-y';
                this.image = false;
            }

            if (opts.repeatX && opts.repeatY) {
                repeat = 'repeat';
                this.image = false;
            }

            if (this.image) {

                /**
                 * Define $img
                 * @type {*|jQuery}
                 */
                this.$img = $('<img />').attr({
                    src: opts.url,
                    alt: opts.text,
                    title: opts.text
                });

                if (opts.stretch) {
                    this.$img.css({
                        width: '100%',
                        height: '100%'
                    });
                }

                this.setHtml(this.$img);

            } else {

                this.$.css({
                    backgroundImage: "url('" + opts.url + "')",
                    backgroundRepeat: repeat,
                    backgroundSize: opts.stretch ? 'cover' : 'auto'
                });
            }

            this.view.controller.clearParentThumbnail();
            this.updateFilters(opts);
        },

        /**
         * Define update filters
         * @memberOf ImageElement
         * @param {object} opts
         */
        updateFilters: function updateFilters(opts) {

            // Get image
            var $img = $('img', this.$);

            for (var index in opts) {

                if (opts.hasOwnProperty(index)) {

                    if (index.match(/^update/)) {

                        /**
                         * Define callback
                         * @type {function}
                         */
                        var callback = this[index];

                        typeof callback === 'function' ?
                            callback.bind(this)($img, opts[index]) :
                            this.view.scope.logger.warn(
                                'Undefined callback',
                                index
                            );
                    }
                }
            }
        },

        /**
         * Render Embedded content
         * @memberOf ImageElement
         * @param {{}} opts
         */
        renderSplitEmbeddedContent: function renderSplitEmbeddedContent(opts) {

            if (!opts.url) {
                return false;
            }

            /**
             * Define scope
             * @type {ImageElement}
             */
            var $image = this;

            /**
             * Set img dimensions
             * @param e
             * @private
             */
            function _setDimensions(e) {

                /**
                 * Calculate image proportions
                 * @type {number}
                 */
                var proportions = ($image.$.height() * 100) / e.target.height,
                    width = e.target.width * (proportions / 100);

                $image.$img.css({
                    height: '100%',
                    width: width,
                    marginLeft: opts.simulate ? -(width / (opts.splitTo + 1)) : 0
                });
            }

            /**
             * Load image
             * @type {Image}
             */
            var img = new Image();

            img.src = opts.url;
            img.onload = _setDimensions;
            img.onerror = function () {
                $image.view.scope.logger.warn(
                    'Unable to load image',
                    img
                );
            };

            /**
             * Define $img
             * @type {*|jQuery}
             */
            $image.$img = $('<img />').attr({
                src: img.src,
                alt: opts.text,
                title: opts.text
            });

            $image.setHtml($image.$img);

            return false;
        },

        /**
         * Update blur
         * @memberOf ImageElement
         * @param $img
         * @param blur
         */
        updateBlur: function updateBlur($img, blur) {
            this.base.lib.css.defineCss(
                'filter', $img, 'blur({0}px)'.replace(/\{0}/, blur)
            );
        },

        /**
         * Update saturate
         * @memberOf ImageElement
         * @param $img
         * @param saturate
         */
        updateSaturate: function updateSaturate($img, saturate) {
            this.base.lib.css.defineCss(
                'filter', $img, 'saturate({0})'.replace(/\{0}/, saturate)
            );
        },

        /**
         * Update contrast
         * @memberOf ImageElement
         * @param $img
         * @param contrast
         */
        updateContrast: function updateContrast($img, contrast) {
            this.base.lib.css.defineCss(
                'filter', $img, 'contrast({0})'.replace(/\{0}/, contrast)
            );
        },

        /**
         * Update brightness
         * @memberOf ImageElement
         * @param $img
         * @param brightness
         */
        updateBrightness: function updateBrightness($img, brightness) {
            this.base.lib.css.defineCss(
                'filter', $img, 'brightness({0})'.replace(/\{0}/, brightness)
            );
        },

        /**
         * Update grayscale
         * @memberOf ImageElement
         * @param $img
         * @param grayscale
         */
        updateGrayscale: function updateGrayscale($img, grayscale) {
            this.base.lib.css.defineCss(
                'filter', $img, 'grayscale({0})'.replace(/\{0}/, grayscale)
            );
        },

        /**
         * Update hue-rotate
         * @memberOf ImageElement
         * @param $img
         * @param hueRotate
         */
        updateHueRotate: function updateHueRotate($img, hueRotate) {
            this.base.lib.css.defineCss(
                'filter', $img, 'hue-rotate({0}deg)'.replace(/\{0}/, hueRotate)
            );
        },

        /**
         * Update invert
         * @memberOf ImageElement
         * @param $img
         * @param invert
         */
        updateInvert: function updateInvert($img, invert) {
            this.base.lib.css.defineCss(
                'filter', $img, 'invert({0})'.replace(/\{0}/, invert)
            );
        },

        /**
         * Update opacity
         * @memberOf ImageElement
         * @param $img
         * @param opacity
         */
        updateOpacity: function updateOpacity($img, opacity) {
            $img.css({
                opacity: parseInt(opacity, 10) / 100
            });
        },

        /**
         * Update sepia
         * @memberOf ImageElement
         * @param $img
         * @param sepia
         */
        updateSepia: function updateSepia($img, sepia) {
            this.base.lib.css.defineCss(
                'filter', $img, 'sepia({0})'.replace(/\{0}/, sepia)
            );
        },

        /**
         * Update drop shadow
         * @memberOf ImageElement
         * @param $img
         * @param shadow
         */
        updateDropShadow: function updateDropShadow($img, shadow) {
            $img.css({
                boxShadow: 'rgb(0, 0, 0) 0 0 {0}px'.replace(/\{0}/, shadow)
            });
        },

        /**
         * Update zoom
         * @memberOf ImageElement
         * @param $img
         * @param zoom
         */
        updateZoom: function updateZoom($img, zoom) {
            $img.css({
                zoom: zoom + '%'
            });
        },

        /**
         * Update rotate
         * @memberOf ImageElement
         * @param $img
         * @param rotate
         */
        updateRotate: function updateRotate($img, rotate) {

            // Get css
            var css = this.base.lib.css;

            css.defineCss(
                'transform', $img, 'rotate({0}deg)'.replace(/\{0}/, rotate)
            );
            css.resetMatrix($img);
        },

        /**
         * Update SkewY
         * @memberOf ImageElement
         * @param $img
         * @param y
         */
        updateSkewY: function updateSkewY($img, y) {

            // Get css
            var css = this.base.lib.css;

            css.defineCss(
                'transform', $img, 'skewY({0}deg)'.replace(/\{0}/, y)
            );
            css.resetMatrix($img);
        },

        /**
         * Update SkewX
         * @memberOf ImageElement
         * @param $img
         * @param x
         */
        updateSkewX: function updateSkewX($img, x) {

            // Get css
            var css = this.base.lib.css;

            css.defineCss(
                'transform', $img, 'skewX({0}deg)'.replace(/\{0}/, x)
            );
            css.resetMatrix($img);
        },

        /**
         * Update url
         * @memberOf ImageElement
         * @param $img
         * @param {string} src
         */
        updateUrl: function updateUrl($img, src) {

            /**
             * Define range activation
             * @param {boolean} activate
             * @private
             */
            function _activateRange(activate) {

                // Get range inputs
                var $range = $('input[type="range"]'),
                    i = 0, l = $range.length;

                $range.prop({disabled: !activate});

                if (activate) {

                    for (; i < l; i++) {
                        $($range[i]).trigger('blur.range')
                    }
                }
            }

            var $element = this;

            $img.on('load', function _load() {
                $img.show();
                _activateRange(true);
            });

            $img.on('error', function _error() {

                if (src && src.length > 0) {
                    $element.view.scope.logger.warn(
                        'Unable to load image', arguments
                    );
                }

                _activateRange(false);
            });

            if (src && src.length > 0) {
                $img.attr({src: src});
            }
        }

    }, PluginElement.prototype);
});