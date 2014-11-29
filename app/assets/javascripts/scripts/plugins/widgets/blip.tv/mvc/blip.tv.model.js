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
], function defineBlipTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define BlipTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class BlipTvModel
     * @constructor
     */
    var BlipTvModel = function BlipTvModel() {

        /**
         * Define preferences
         * @member BlipTvModel
         * @type {{
         *      bliptvEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            bliptvEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member BlipTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return BlipTvModel.extend('BlipTvModel', {

        /**
         * Set BlipTv embed code
         * @member BlipTvModel
         * @param {string} embed
         */
        setBliptvEmbedCode: function setBliptvEmbedCode(embed) {
            this.setPrefs('bliptvEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
