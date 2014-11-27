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
], function defineDailyMotionModel(BaseModel, WidgetContentModel) {

    /**
     * Define DailyMotion model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class DailyMotionModel
     * @constructor
     */
    var DailyMotionModel = function DailyMotionModel() {

        /**
         * Define preferences
         * @member DailyMotionModel
         * @type {{
         *      dailymotionUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            dailymotionUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member DailyMotionModel
         * @type {{}}
         */
        this.rules = {};
    };

    return DailyMotionModel.extend('DailyMotionModel', {

        /**
         * Set DailyMotion Url
         * @member DailyMotionModel
         * @param {string} url
         */
        setDailymotionUrl: function setDailymotionUrl(url) {
            this.setPrefs('dailymotionUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
