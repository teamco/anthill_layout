/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
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

            for (var index in opts) {

                if (opts.hasOwnProperty(index)) {

                    if (index.match(/^update/)) {

                        /**
                         * Define callback
                         * @type {function}
                         */
                        var callback = this[index];

                        typeof callback === 'function' ?
                            callback.bind(this)(this.$, opts[index]) :
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
         * Define image css
         * @memberOf ImageElement
         * @param $img
         * @param {string} value
         * @param {string} type
         */
        defineCss: function defineCss(type, $img, value) {

            /**
             * Define update css
             * @private
             */
            function _updateCss(css) {

                // Define css
                var style = {};

                style[type] = css;
                style['-webkit-' + type] = css;

                $img.css(style);
            }

            var _f = $img.css(type),
                _wf = $img.css('-webkit-' + type);

            var _filter = _f === 'none' ?
                _wf === 'none' ? 'none' : _wf : _f;

            if (_filter === 'none') {

                _updateCss(value);
                return false;
            }

            var _css = _filter.split(/ /g),
                _value = [], i = 0, l = _css.length,
                _updated = false;

            for (; i < l; i++) {

                var filter = _css[i];

                if (filter.indexOf(value.match(/\w+/)[0]) !== -1) {
                    filter = value;
                    _updated = true;
                }

                _value.push(filter);
            }

            if (!_updated) {
                _value.push(value);
            }

            _updateCss(_value.join(' '));
        },

        /**
         * Update blur
         * @memberOf ImageElement
         * @param $img
         * @param blur
         */
        updateBlur: function updateBlur($img, blur) {
            this.defineCss(
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
            this.defineCss(
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
            this.defineCss(
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
            this.defineCss(
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
            this.defineCss(
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
            this.defineCss(
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
            this.defineCss(
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
            this.defineCss(
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
         * Update scale
         * @memberOf ImageElement
         * @param $img
         * @param scale
         */
        updateScale: function updateScale($img, scale) {
            this.defineCss(
                'transform', $img, 'scale({0})'.replace(/\{0}/, scale)
            );
        },

        /**
         * Update rotate
         * @memberOf ImageElement
         * @param $img
         * @param rotate
         */
        updateRotate: function updateRotate($img, rotate) {
            this.defineCss(
                'transform', $img, 'rotate({0}deg)'.replace(/\{0}/, rotate)
            );
        },

        /**
         * Update SkewY
         * @memberOf ImageElement
         * @param $img
         * @param y
         */
        updateSkewY: function updateSkewY($img, y) {
            this.defineCss(
                'transform', $img, 'skewY({0}deg)'.replace(/\{0}/, y)
            );
        },

        /**
         * Update SkewX
         * @memberOf ImageElement
         * @param $img
         * @param x
         */
        updateSkewX: function updateSkewX($img, x) {
            this.defineCss(
                'transform', $img, 'skewX({0}deg)'.replace(/\{0}/, x)
            );
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
                var $range = $('li.range input', $img.parents('ul:first')),
                    i = 0, l = $range.length;

                $range.prop({disabled: !activate});

                if (activate) {

                    for (; i < l; i++) {
                        $($range[i]).trigger('blur.range')
                    }
                }
            }

            var $range = $('li.range', $img.parents('ul:first')),
                $element = this;

            $img.on('load', function _load() {

                // Get border width
                var border = parseInt($range.css('borderWidth'), 10) || 0;

                $img.show().parent().css({
                    marginTop: -($range.outerHeight() + border * 2) * $range.length
                });

                _activateRange(true);
            });

            $img.on('error', function _error() {

                $element.view.scope.logger.warn(
                    'Unable to load image', arguments
                );

                _activateRange(false);
            });

            $img.attr({src: src});
        }

    }, BaseElement.prototype);

});