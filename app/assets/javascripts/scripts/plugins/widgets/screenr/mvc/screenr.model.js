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
], function defineScreenrModel(BaseModel, WidgetContentModel) {

    /**
     * Define Screenr model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ScreenrModel
     * @constructor
     */
    var ScreenrModel = function ScreenrModel() {

        /**
         * Define preferences
         * @memberOf ScreenrModel
         * @type {{
         *      screenrEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            screenrEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf ScreenrModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ScreenrModel.extend('ScreenrModel', {

        /**
         * Set Screenr embed code
         * @memberOf ScreenrModel
         * @param {string} embed
         */
        setScreenrEmbedCode: function setScreenrEmbedCode(embed) {
            this.setPrefs('screenrEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
