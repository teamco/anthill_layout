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
], function defineOnetvRuModel(BaseModel, WidgetContentModel) {

    /**
     * Define OnetvRu model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OnetvRuModel
     * @constructor
     */
    var OnetvRuModel = function OnetvRuModel() {

        /**
         * Define preferences
         * @member OnetvRuModel
         * @type {{
         *      onetvruEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            onetvruEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member OnetvRuModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OnetvRuModel.extend('OnetvRuModel', {

        /**
         * Set OnetvRu embed code
         * @member OnetvRuModel
         * @param {string} embed
         */
        setOnetvruEmbedCode: function setOnetvruEmbedCode(embed) {
            this.setPrefs('onetvruEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
