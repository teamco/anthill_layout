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
], function definePreziModel(BaseModel, WidgetContentModel) {

    /**
     * Define Prezi model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PreziModel
     * @constructor
     */
    var PreziModel = function PreziModel() {

        /**
         * Define preferences
         * @memberOf PreziModel
         * @type {{
         *      preziEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            preziEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf PreziModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PreziModel.extend('PreziModel', {

        /**
         * Set Prezi embed code
         * @memberOf PreziModel
         * @param {string} embed
         */
        setPreziEmbedCode: function setPreziEmbedCode(embed) {
            this.setPrefs('preziEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
