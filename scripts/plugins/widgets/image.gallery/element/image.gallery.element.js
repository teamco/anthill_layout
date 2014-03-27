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

        this.addCSS('image', {resource: '/widgets'});

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
             * Define embedded template
             * @type {string}
             */
            this.setHtml(
                $('<img />').attr({
                    src: url,
                    alt: text,
                    title: text
                })
            );
        }

    }, BaseElement.prototype);

});