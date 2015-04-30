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
], function defineUstreamModel(BaseModel, WidgetContentModel) {

    /**
     * Define Ustream model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class UstreamModel
     * @constructor
     */
    var UstreamModel = function UstreamModel() {

        /**
         * Define preferences
         * @memberOf UstreamModel
         * @type {{
         *      ustreamEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            ustreamEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf UstreamModel
         * @type {{}}
         */
        this.rules = {};
    };

    return UstreamModel.extend('UstreamModel', {

        /**
         * Set Ustream embed code
         * @memberOf UstreamModel
         * @param {string} embed
         */
        setUstreamEmbedCode: function setUstreamEmbedCode(embed) {
            this.setPrefs('ustreamEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
