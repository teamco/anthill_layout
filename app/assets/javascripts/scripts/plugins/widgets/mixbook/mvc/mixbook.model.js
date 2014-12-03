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
], function defineMixbookModel(BaseModel, WidgetContentModel) {

    /**
     * Define Mixbook model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class MixbookModel
     * @constructor
     */
    var MixbookModel = function MixbookModel() {

        /**
         * Define preferences
         * @member MixbookModel
         * @type {{
         *      mixbookEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            mixbookEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member MixbookModel
         * @type {{}}
         */
        this.rules = {};
    };

    return MixbookModel.extend('MixbookModel', {

        /**
         * Set Mixbook embed code
         * @member MixbookModel
         * @param {string} embed
         */
        setMixbookEmbedCode: function setMixbookEmbedCode(embed) {
            this.setPrefs('mixbookEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
