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
], function defineSwfModel(BaseModel, WidgetContentModel) {

    /**
     * Define Swf model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SwfModel
     * @constructor
     */
    var SwfModel = function SwfModel() {

        /**
         * Define preferences
         * @memberOf SwfModel
         * @type {{
         *      swfUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         *      swfFlashVars: {type: string, disabled: boolean, value: undefined, visible: boolean}
         *      swfParams: {type: string, disabled: boolean, value: undefined, visible: boolean}
         *      swfAttributes: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            swfUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            swfFlashVars: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            swfParams: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            },
            swfAttributes: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf SwfModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SwfModel.extend('SwfModel', {

        /**
         * Set Swf Url
         * @memberOf SwfModel
         * @param {string} url
         */
        setSwfUrl: function setSwfUrl(url) {
            this.setPrefs('swfUrl', url);
        },

        /**
         * Set Swf params
         * @memberOf SwfModel
         * @param {string} params
         */
        setSwfParams: function setSwfParams(params) {
            this.setPrefs('swfParams', params);
        },

        /**
         * Set Swf flashvars
         * @memberOf SwfModel
         * @param {string} flashvars
         */
        setSwfFlashVars: function setSwfFlashVars(flashvars) {
            this.setPrefs('swfFlashVars', flashvars);
        },

        /**
         * Set Swf attributes
         * @memberOf SwfModel
         * @param {string} flashvars
         */
        setSwfAttributes: function setSwfAttributes(attributes) {
            this.setPrefs('swfAttributes', attributes);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});