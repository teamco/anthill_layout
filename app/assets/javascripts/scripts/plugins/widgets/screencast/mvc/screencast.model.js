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
], function defineScreencastModel(BaseModel, WidgetContentModel) {

    /**
     * Define Screencast model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ScreencastModel
     * @constructor
     */
    var ScreencastModel = function ScreencastModel() {

        /**
         * Define preferences
         * @member ScreencastModel
         * @type {{
         *      screencastEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            screencastEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member ScreencastModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ScreencastModel.extend('ScreencastModel', {

        /**
         * Set Screencast embed code
         * @member ScreencastModel
         * @param {string} embed
         */
        setScreencastEmbedCode: function setScreencastEmbedCode(embed) {
            this.setPrefs('screencastEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
