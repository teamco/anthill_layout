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
], function defineTimeToastModel(BaseModel, WidgetContentModel) {

    /**
     * Define TimeToast model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TimeToastModel
     * @constructor
     */
    var TimeToastModel = function TimeToastModel() {

        /**
         * Define preferences
         * @member TimeToastModel
         * @type {{
         *      timetoastEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            timetoastEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member TimeToastModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TimeToastModel.extend('TimeToastModel', {

        /**
         * Set TimeToast embed code
         * @member TimeToastModel
         * @param {string} embed
         */
        setTimetoastEmbedCode: function setTimetoastEmbedCode(embed) {
            this.setPrefs('timetoastEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
