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
], function defineTwentyFourVideoModel(BaseModel, WidgetContentModel) {

    /**
     * Define TwentyFourVideo model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TwentyFourVideoModel
     * @constructor
     */
    var TwentyFourVideoModel = function TwentyFourVideoModel() {

        /**
         * Define preferences
         * @memberOf TwentyFourVideoModel
         * @type {{
         *      twentyfourvideoEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            twentyfourvideoEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf TwentyFourVideoModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TwentyFourVideoModel.extend('TwentyFourVideoModel', {

        /**
         * Set TwentyFourVideo embed code
         * @memberOf TwentyFourVideoModel
         * @param {string} embed
         */
        setTwentyfourvideoEmbedCode: function setTwentyfourvideoEmbedCode(embed) {
            this.setPrefs('twentyfourvideoEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
