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
], function defineQuicktimeModel(BaseModel, WidgetContentModel) {

    /**
     * Define Quicktime model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class QuicktimeModel
     * @constructor
     */
    var QuicktimeModel = function QuicktimeModel() {

        /**
         * Define preferences
         * @member QuicktimeModel
         * @type {{
         *      youtubeUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            quicktimeUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member QuicktimeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return QuicktimeModel.extend('QuicktimeModel', {

        /**
         * Set Quicktime Url
         * @member QuicktimeModel
         * @param {string} url
         */
        setQuicktimeUrl: function setQuicktimeUrl(url) {
            this.setPrefs('quicktimeUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});