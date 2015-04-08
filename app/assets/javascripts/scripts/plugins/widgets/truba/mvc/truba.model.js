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
], function defineTrubaModel(BaseModel, WidgetContentModel) {

    /**
     * Define Truba model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TrubaModel
     * @constructor
     */
    var TrubaModel = function TrubaModel() {

        /**
         * Define preferences
         * @memberOf TrubaModel
         * @type {{
         *      trubaUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            trubaUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf TrubaModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TrubaModel.extend('TrubaModel', {

        /**
         * Set Truba Url
         * @memberOf TrubaModel
         * @param {string} url
         */
        setTrubaUrl: function setTrubaUrl(url) {
            this.setPrefs('trubaUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
