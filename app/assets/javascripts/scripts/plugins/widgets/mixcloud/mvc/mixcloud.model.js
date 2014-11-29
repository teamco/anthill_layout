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
], function defineMixcloudModel(BaseModel, WidgetContentModel) {

    /**
     * Define Mixcloud model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class MixcloudModel
     * @constructor
     */
    var MixcloudModel = function MixcloudModel() {

        /**
         * Define preferences
         * @member MixcloudModel
         * @type {{
         *      mixcloudEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            mixcloudEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member MixcloudModel
         * @type {{}}
         */
        this.rules = {};
    };

    return MixcloudModel.extend('MixcloudModel', {

        /**
         * Set Mixcloud embed code
         * @member MixcloudModel
         * @param {string} embed
         */
        setMixcloudEmbedCode: function setMixcloudEmbedCode(embed) {
            this.setPrefs('mixcloudEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
