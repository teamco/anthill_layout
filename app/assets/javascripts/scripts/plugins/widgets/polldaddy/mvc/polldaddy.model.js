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
], function definePolldaddyModel(BaseModel, WidgetContentModel) {

    /**
     * Define Polldaddy model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PolldaddyModel
     * @constructor
     */
    var PolldaddyModel = function PolldaddyModel() {

        /**
         * Define preferences
         * @memberOf PolldaddyModel
         * @type {{
         *      polldaddyEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            polldaddyEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf PolldaddyModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PolldaddyModel.extend('PolldaddyModel', {

        /**
         * Set Polldaddy embed code
         * @memberOf PolldaddyModel
         * @param {string} embed
         */
        setPolldaddyEmbedCode: function setPolldaddyEmbedCode(embed) {
            this.setPrefs('polldaddyEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
