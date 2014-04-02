/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineImageModel(BaseModel) {

    /**
     * Define Image model
     * @extends BaseModel
     * @class ImageModel
     * @constructor
     */
    var ImageModel = function ImageModel() {

        /**
         * Define preferences
         * @member ImageModel
         * @type {{
         *      imageUrl: {type: string, disabled: boolean, value: undefined},
         *      imageText: {type: string, disabled: boolean, value: undefined}
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
            },
            imageRepeatX: {
                type: 'checkbox',
                disabled: false,
                checked: false
            },
            imageRepeatY: {
                type: 'checkbox',
                disabled: false,
                checked: false
            }
        };

        /**
         * Define rules
         * @member ImageModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ImageModel.extend('ImageModel', {

        /**
         * Set Image Url
         * @member ImageModel
         * @param {string} url
         */
        setImageUrl: function setImageUrl(url) {
            this.setPrefs('imageUrl', url);
        },

        /**
         * Set Image Text
         * @member ImageModel
         * @param {string} text
         */
        setImageText: function setImageText(text) {
            this.setPrefs('imageText', text);
        },

        /**
         * Set image repeat-x
         * @member ImageModel
         * @param {boolean} repeatX
         */
        setImageRepeatX: function setImageRepeatX(repeatX) {
            this.setPrefs('imageRepeatX', repeatX);
        },

        /**
         * Set image repeat-y
         * @member ImageModel
         * @param {boolean} repeatY
         */
        setImageRepeatY: function setImageRepeatY(repeatY) {
            this.setPrefs('imageRepeatY', repeatY);
        }


    }, BaseModel.prototype);
});