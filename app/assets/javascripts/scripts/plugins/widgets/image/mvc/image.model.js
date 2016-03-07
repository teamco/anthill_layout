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
         *      imageUrl: {type: string, disabled: boolean, value: undefined, visible: boolean, monitor: {events: string[], callback: string}},
         *      imageText: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      imageRepeatX: {type: string, disabled: boolean, checked: boolean, visible: boolean},
         *      imageRepeatY: {type: string, disabled: boolean, checked: boolean, visible: boolean},
         *      imageStretch: {type: string, disabled: boolean, checked: boolean, visible: boolean},
         *      imageSplitContent: {type: string, disabled: boolean, checked: boolean, visible: boolean},
         *      imageBlur: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageBrightness: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageContrast: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageGrayscale: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageHueRotate: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageInvert: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageOpacity: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageSaturate: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageSepia: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageDropShadow: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageZoom: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageRotate: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageSkewY: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}},
         *      imageSkewX: {type: string, disabled: boolean, visible: boolean, value: number, min: number, max: number, step: number, unit: string, monitor: {events: string[], callback: string}}
         * }}
         */
        this.preferences = {
            imageUrl: {
                type: 'textarea',
                disabled: false,
                value: 'http://www.femoticons.net/images/posts/cool_sunglasses_emoticon.jpg',
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
            },
            imageZoom: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 100,
                min: 1,
                max: 200,
                step: 0.1,
                unit: '%',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageRotate: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 0,
                min: -360,
                max: 360,
                step: 1,
                unit: 'deg',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageSkewY: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 0,
                min: -100,
                max: 100,
                step: 1,
                unit: 'deg',
                monitor: {
                    events: ['update.preview'],
                    callback: 'updatePreview'
                }
            },
            imageSkewX: {
                type: 'range',
                disabled: true,
                visible: true,
                value: 0,
                min: -100,
                max: 100,
                step: 1,
                unit: 'deg',
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

    return ImageModel.extend(
        'ImageModel', {

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
            },

            /**
             * Set image blur
             * @memberOf ImageModel
             * @param {number} blur
             */
            setImageBlur: function setImageBlur(blur) {
                this.setPrefs('imageBlur', blur);
            },

            /**
             * Set image brightness
             * @memberOf ImageModel
             * @param {number} brightness
             */
            setImageBrightness: function setImageBrightness(brightness) {
                this.setPrefs('imageBrightness', brightness);
            },

            /**
             * Set image contrast
             * @memberOf ImageModel
             * @param {number} contrast
             */
            setImageContrast: function setImageContrast(contrast) {
                this.setPrefs('imageContrast', contrast);
            },

            /**
             * Set image grayscale
             * @memberOf ImageModel
             * @param {number} grayscale
             */
            setImageGrayscale: function setImageGrayscale(grayscale) {
                this.setPrefs('imageGrayscale', grayscale);
            },

            /**
             * Set image hue
             * @memberOf ImageModel
             * @param {number} hue
             */
            setImageHueRotate: function setImageHueRotate(hue) {
                this.setPrefs('imageHueRotate', hue);
            },

            /**
             * Set image invert
             * @memberOf ImageModel
             * @param {number} invert
             */
            setImageInvert: function setImageInvert(invert) {
                this.setPrefs('imageInvert', invert);
            },

            /**
             * Set image opacity
             * @memberOf ImageModel
             * @param {number} opacity
             */
            setImageOpacity: function setImageOpacity(opacity) {
                this.setPrefs('imageOpacity', opacity);
            },

            /**
             * Set image saturate
             * @memberOf ImageModel
             * @param {number} saturate
             */
            setImageSaturate: function setImageSaturate(saturate) {
                this.setPrefs('imageSaturate', saturate);
            },

            /**
             * Set image sepia
             * @memberOf ImageModel
             * @param {number} sepia
             */
            setImageSepia: function setImageSepia(sepia) {
                this.setPrefs('imageSepia', sepia);
            },

            /**
             * Set image zoom
             * @memberOf ImageModel
             * @param {number} zoom
             */
            setImageZoom: function setImageZoom(zoom) {
                this.setPrefs('imageZoom', zoom);
            },

            /**
             * Set image rotate
             * @memberOf ImageModel
             * @param {number} rotate
             */
            setImageRotate: function setImageRotate(rotate) {
                this.setPrefs('imageRotate', rotate);
            },

            /**
             * Set image SkewY
             * @memberOf ImageModel
             * @param {number} skewY
             */
            setImageSkewY: function setImageSkewY(skewY) {
                this.setPrefs('imageSkewY', skewY);
            },

            /**
             * Set image SkewX
             * @memberOf ImageModel
             * @param {number} skewX
             */
            setImageSkewX: function setImageSkewX(skewX) {
                this.setPrefs('imageSkewX', skewX);
            },

            /**
             * Set image shadow
             * @memberOf ImageModel
             * @param {number} shadow
             */
            setImageDropShadow: function setImageDropShadow(shadow) {
                this.setPrefs('imageDropShadow', shadow);
            }
        },
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});