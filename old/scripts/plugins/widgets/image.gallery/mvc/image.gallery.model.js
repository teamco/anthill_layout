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
         *      imageGalleryUrls: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      imageGalleryTexts: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      imageGalleryResponsive: {type: string, disabled: boolean, value: boolean, visible: boolean}
         * }}
         */
        this.preferences = {
            imageGalleryUrls: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            imageGalleryTexts: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            imageGalleryResponsive: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            }
        };

        /**
         * Define rules
         * @member ImageGalleryModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ImageGalleryModel.extend('ImageGalleryModel', {

        /**
         * Set ImageGallery Url
         * @member ImageGalleryModel
         * @param {string} url
         */
        setImageGalleryUrls: function setImageGalleryUrls(url) {
            this.setPrefs('imageGalleryUrls', url);
        },

        /**
         * Set ImageGallery Text
         * @member ImageGalleryModel
         * @param {string} text
         */
        setImageGalleryTexts: function setImageGalleryTexts(text) {
            this.setPrefs('imageGalleryTexts', text);
        }

    }, BaseModel.prototype);
});