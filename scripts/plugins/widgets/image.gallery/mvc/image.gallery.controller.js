/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineImageController(PluginBase, WidgetContentController) {

    /**
     * Define image.gallery controller
     * @class ImageGalleryController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ImageGalleryController = function ImageGalleryController() {
    };

    return ImageGalleryController.extend('ImageGalleryController', {

        /**
         * Set embedded content
         * @member ImageGalleryController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$imagegallery.renderEmbeddedContent(
                this.model.getPrefs('imageGalleryUrls'),
                this.model.getPrefs('imageGalleryTexts')
            );
        },

        /**
         * Add ImageGallery rule
         * @member ImageGalleryController
         * @param e
         */
        addImageGalleryRule: function addImageGalleryRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            this.publishRule(
                $button.attr('value'),
                this.scope.constructor.name
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});