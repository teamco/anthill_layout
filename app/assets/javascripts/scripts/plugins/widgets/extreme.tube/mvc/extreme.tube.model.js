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
], function defineExtremeTubeModel(BaseModel, WidgetContentModel) {

    /**
     * Define ExtremeTube model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ExtremeTubeModel
     * @constructor
     */
    var ExtremeTubeModel = function ExtremeTubeModel() {

        /**
         * Define preferences
         * @memberOf ExtremeTubeModel
         * @type {{
         *      extremetubeEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            extremetubeEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf ExtremeTubeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ExtremeTubeModel.extend('ExtremeTubeModel', {

        /**
         * Set ExtremeTube embed code
         * @memberOf ExtremeTubeModel
         * @param {string} embed
         */
        setExtremetubeEmbedCode: function setExtremetubeEmbedCode(embed) {
            this.setPrefs('extremetubeEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
