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
         * @param {{}} opts
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
        }

    }, BaseElement.prototype);

});