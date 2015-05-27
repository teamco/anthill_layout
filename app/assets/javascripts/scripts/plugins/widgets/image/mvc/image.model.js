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
         * @memberOf ImageModel
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
                visible: true,
                monitor: {
                    events: ['blur.preview'],
                    callback: 'updatePreview'
                }
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
            },
            imageBlur: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 0,
                min: 0,
                max: 100,
                step: 1,
                unit: 'px',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageBrightness: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 1,
                min: 0.1,
                max: 10,
                step: 0.1,
                unit: '',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageContrast: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 1.1,
                min: 0.1,
                max: 10,
                step: 0.1,
                unit: '',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageGrayscale: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 0.1,
                min: 0.1,
                max: 1,
                step: 0.01,
                unit: '',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageHueRotate: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 0,
                min: 0,
                max: 360,
                step: 1,
                unit: 'deg',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageInvert: {
                type: 'range',
                disabled: false,
                visible: true,
                value: 0.1,
                min: 0.1,
                max: 1,
                step: 0.01,
                unit: '',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageOpacity: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 100,
                min: 0,
                max: 100,
                step: 1,
                unit: '%',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageSaturate: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 1,
                min: 0.1,
                max: 10,
                step: 0.1,
                unit: '',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageSepia: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 0.1,
                min: 0.1,
                max: 1,
                step: 0.01,
                unit: '',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageDropShadow: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 0,
                min: 0,
                max: 50,
                step: 1,
                unit: 'px',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            }
        };

        /**
         * Define rules
         * @memberOf ImageModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ImageModel.extend('ImageModel', {

        /**
         * Set Image Url
         * @memberOf ImageModel
         * @param {string} url
         */
        setImageUrl: function setImageUrl(url) {
            this.setPrefs('imageUrl', url);
        },

        /**
         * Set Image Text
         * @memberOf ImageModel
         * @param {string} text
         */
        setImageText: function setImageText(text) {
            this.setPrefs('imageText', text);
        },

        /**
         * Set image repeat-x
         * @memberOf ImageModel
         * @param {boolean} repeatX
         */
        setImageRepeatX: function setImageRepeatX(repeatX) {
            this.setPrefs('imageRepeatX', repeatX);
        },

        /**
         * Set image repeat-y
         * @memberOf ImageModel
         * @param {boolean} repeatY
         */
        setImageRepeatY: function setImageRepeatY(repeatY) {
            this.setPrefs('imageRepeatY', repeatY);
        },

        /**
         * Set image stretch
         * @memberOf ImageModel
         * @param {boolean} stretch
         */
        setImageStretch: function setImageStretch(stretch) {
            this.setPrefs('imageStretch', stretch);
        },

        /**
         * Set image split content
         * @memberOf ImageModel
         * @param {boolean} split
         */
        setImageSplitContent: function setImageSplitContent(split) {
            this.setPrefs('imageSplitContent', split);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});