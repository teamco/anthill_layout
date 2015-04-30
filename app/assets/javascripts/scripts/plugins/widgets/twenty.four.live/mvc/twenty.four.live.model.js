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
], function defineTwentyFourLiveModel(BaseModel, WidgetContentModel) {

    /**
     * Define TwentyFourLive model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TwentyFourLiveModel
     * @constructor
     */
    var TwentyFourLiveModel = function TwentyFourLiveModel() {

        /**
         * Define preferences
         * @memberOf TwentyFourLiveModel
         * @type {{
         *      twentyfourliveUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            twentyfourliveUrl: {
                type: 'text',
                disabled: true,
                value: 'https://www.youtube.com/watch?feature=player_embedded&v=naKpfjR5fqo',
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf TwentyFourLiveModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TwentyFourLiveModel.extend('TwentyFourLiveModel', {

        /**
         * Set TwentyFourLive Url
         * @memberOf TwentyFourLiveModel
         * @param {string} url
         */
        setTwentyfourliveUrl: function setTwentyfourliveUrl(url) {
            this.setPrefs('twentyfourliveUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
