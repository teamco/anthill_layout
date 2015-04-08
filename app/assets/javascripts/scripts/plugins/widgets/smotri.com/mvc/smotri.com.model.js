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
], function defineSmotriComModel(BaseModel, WidgetContentModel) {

    /**
     * Define SmotriCom model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SmotriComModel
     * @constructor
     */
    var SmotriComModel = function SmotriComModel() {

        /**
         * Define preferences
         * @memberOf SmotriComModel
         * @type {{
         *      smotricomEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            smotricomEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf SmotriComModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SmotriComModel.extend('SmotriComModel', {

        /**
         * Set SmotriCom embed code
         * @memberOf SmotriComModel
         * @param {string} embed
         */
        setSmotricomEmbedCode: function setSmotricomEmbedCode(embed) {
            this.setPrefs('smotricomEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
