/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineImageController(PluginBase, WidgetBase) {

    /**
     * Define image.gallery controller
     * @class ImageGalleryController
     * @extends PluginController
     * @extends WidgetController
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
        }

    }, PluginBase.prototype, WidgetBase.prototype);
});