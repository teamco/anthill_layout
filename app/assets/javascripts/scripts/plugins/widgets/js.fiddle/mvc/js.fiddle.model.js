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
], function defineJsFiddleModel(BaseModel, WidgetContentModel) {

    /**
     * Define JsFiddle model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class JsFiddleModel
     * @constructor
     */
    var JsFiddleModel = function JsFiddleModel() {

        /**
         * Define preferences
         * @memberOf JsFiddleModel
         * @type {{
         *      jsfiddleEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            jsfiddleEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf JsFiddleModel
         * @type {{}}
         */
        this.rules = {};
    };

    return JsFiddleModel.extend('JsFiddleModel', {

        /**
         * Set JsFiddle embed code
         * @memberOf JsFiddleModel
         * @param {string} embed
         */
        setJsfiddleEmbedCode: function setJsfiddleEmbedCode(embed) {
            this.setPrefs('jsfiddleEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
