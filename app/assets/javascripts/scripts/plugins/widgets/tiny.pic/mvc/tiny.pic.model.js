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
], function defineTinyPicModel(BaseModel, WidgetContentModel) {

    /**
     * Define TinyPic model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TinyPicModel
     * @constructor
     */
    var TinyPicModel = function TinyPicModel() {

        /**
         * Define preferences
         * @member TinyPicModel
         * @type {{
         *      tinypicEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            tinypicEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member TinyPicModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TinyPicModel.extend('TinyPicModel', {

        /**
         * Set TinyPic embed code
         * @member TinyPicModel
         * @param {string} embed
         */
        setTinypicEmbedCode: function setTinypicEmbedCode(embed) {
            this.setPrefs('tinypicEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
