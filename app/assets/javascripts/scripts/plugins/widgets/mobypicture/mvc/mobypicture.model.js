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
], function defineMobypictureModel(BaseModel, WidgetContentModel) {

    /**
     * Define Mobypicture model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class MobypictureModel
     * @constructor
     */
    var MobypictureModel = function MobypictureModel() {

        /**
         * Define preferences
         * @member MobypictureModel
         * @type {{
         *      mobypictureEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            mobypictureHtmlCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member MobypictureModel
         * @type {{}}
         */
        this.rules = {};
    };

    return MobypictureModel.extend('MobypictureModel', {

        /**
         * Set Mobypicture embed code
         * @member MobypictureModel
         * @param {string} embed
         */
        setMobypictureHtmlCode: function setMobypictureHtmlCode(embed) {
            this.setPrefs('mobypictureEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
