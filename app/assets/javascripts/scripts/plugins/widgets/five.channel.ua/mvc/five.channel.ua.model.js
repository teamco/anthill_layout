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
], function defineFiveChannelUaModel(BaseModel, WidgetContentModel) {

    /**
     * Define FiveChannelUa model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class FiveChannelUaModel
     * @constructor
     */
    var FiveChannelUaModel = function FiveChannelUaModel() {

        /**
         * Define preferences
         * @memberOf FiveChannelUaModel
         * @type {{
         *      fivechanneluaUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            fivechanneluaUrl: {
                type: 'text',
                value: 'https://www.youtube.com/watch?v=nCqonUIeymU',
                disabled: true,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf FiveChannelUaModel
         * @type {{}}
         */
        this.rules = {};
    };

    return FiveChannelUaModel.extend('FiveChannelUaModel', {

        /**
         * Set FiveChannelUa Url
         * @memberOf FiveChannelUaModel
         * @param {string} url
         */
        setFivechanneluaUrl: function setFivechanneluaUrl(url) {
            this.setPrefs('fivechanneluaUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
