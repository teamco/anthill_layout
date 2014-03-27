/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineImageGalleryModel(BaseModel) {

    /**
     * Define ImageGallery model
     * @extends BaseModel
     * @class ImageGalleryModel
     * @constructor
     */
    var ImageGalleryModel = function ImageGalleryModel() {

        /**
         * Define preferences
         * @member ImageGalleryModel
         * @type {{
         *      imageUrl: {}
         * }}
         */
        this.preferences = {
            imageUrl: {
                type: 'textarea',
                disabled: false,
                value: undefined
            },
            imageText: {
                type: 'text',
                disabled: false,
                value: undefined
            }
        };
    };

    return ImageGalleryModel.extend('ImageGalleryModel', {

        /**
         * Set ImageGallery Url
         * @member ImageGalleryModel
         * @param {string} url
         */
        setImageGalleryUrl: function setImageGalleryUrl(url) {
            this.setPrefs('imageUrl', url);
        },

        /**
         * Set ImageGallery Text
         * @member ImageGalleryModel
         * @param {string} text
         */
        setImageGalleryText: function setImageGalleryText(text) {
            this.setPrefs('imageText', text);
        }


    }, BaseModel.prototype);
});