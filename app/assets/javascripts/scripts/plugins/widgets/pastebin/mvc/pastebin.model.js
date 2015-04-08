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
], function definePastebinModel(BaseModel, WidgetContentModel) {

    /**
     * Define Pastebin model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PastebinModel
     * @constructor
     */
    var PastebinModel = function PastebinModel() {

        /**
         * Define preferences
         * @memberOf PastebinModel
         * @type {{
         *      pastebinEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            pastebinEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf PastebinModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PastebinModel.extend('PastebinModel', {

        /**
         * Set Pastebin embed code
         * @memberOf PastebinModel
         * @param {string} embed
         */
        setPastebinEmbedCode: function setPastebinEmbedCode(embed) {
            this.setPrefs('pastebinEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
