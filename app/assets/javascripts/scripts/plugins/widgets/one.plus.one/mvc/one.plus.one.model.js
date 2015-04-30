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
], function defineOnePlusOneModel(BaseModel, WidgetContentModel) {

    /**
     * Define OnePlusOne model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OnePlusOneModel
     * @constructor
     */
    var OnePlusOneModel = function OnePlusOneModel() {

        /**
         * Define preferences
         * @memberOf OnePlusOneModel
         * @type {{
         *      oneplusoneEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            oneplusoneEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf OnePlusOneModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OnePlusOneModel.extend('OnePlusOneModel', {

        /**
         * Set OnePlusOne embed code
         * @memberOf OnePlusOneModel
         * @param {string} embed
         */
        setOneplusoneEmbedCode: function setOneplusoneEmbedCode(embed) {
            this.setPrefs('oneplusoneEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
