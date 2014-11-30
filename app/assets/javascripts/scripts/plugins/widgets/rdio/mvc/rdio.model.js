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
], function defineRdioModel(BaseModel, WidgetContentModel) {

    /**
     * Define Rdio model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class RdioModel
     * @constructor
     */
    var RdioModel = function RdioModel() {

        /**
         * Define preferences
         * @member RdioModel
         * @type {{
         *      rdioEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            rdioEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member RdioModel
         * @type {{}}
         */
        this.rules = {};
    };

    return RdioModel.extend('RdioModel', {

        /**
         * Set Rdio embed code
         * @member RdioModel
         * @param {string} embed
         */
        setRdioEmbedCode: function setRdioEmbedCode(embed) {
            this.setPrefs('rdioEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
