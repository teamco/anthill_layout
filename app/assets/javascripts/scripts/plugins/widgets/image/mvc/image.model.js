/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function defineImageModel(BaseModel, WidgetContentModel) {

    /**
     * Define Image model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ImageModel
     * @constructor
     */
    var ImageModel = function ImageModel() {

        /**
         * Define preferences
         * @member ImageModel
         * @type {{
         *      imageUrl: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      imageText: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      imageRepeatX: {type: string, disabled: boolean, checked: boolean, visible: boolean},
         *      imageRepeatY: {type: string, disabled: boolean, checked: boolean, visible: boolean},
         *      imageStretch: {type: string, disabled: boolean, checked: boolean, visible: boolean},
         *      imageSplitContent: {type: string, disabled: boolean, checked: boolean, visible: boolean}
         * }}
         */
        this.preferences = {
            imageUrl: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            imageText: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            imageRepeatX: {
                type: 'checkbox',
                disabled: false,
                checked: false,
                visible: true
            },
            imageRepeatY: {
                type: 'checkbox',
                disabled: false,
                checked: false,
                visible: true
            },
            imageStretch: {
                type: 'checkbox',
                disabled: false,
                checked: false,
                visible: true
            },
            imageSplitContent: {
                type: 'checkbox',
                disabled: false,
                checked: false,
                visible: true
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
        },

        /**
         * Set image stretch
         * @member ImageModel
         * @param {boolean} stretch
         */
        setImageStretch: function setImageStretch(stretch) {
            this.setPrefs('imageStretch', stretch);
        },

        /**
         * Set image split content
         * @member ImageModel
         * @param {boolean} split
         */
        setImageSplitContent: function setImageSplitContent(split) {
            this.setPrefs('imageSplitContent', split);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});