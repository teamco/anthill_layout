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
], function defineGiphyModel(BaseModel, WidgetContentModel) {

    /**
     * Define Giphy model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class GiphyModel
     * @constructor
     */
    var GiphyModel = function GiphyModel() {

        /**
         * Define preferences
         * @member GiphyModel
         * @type {{
         *      giphyEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            giphyEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member GiphyModel
         * @type {{}}
         */
        this.rules = {};
    };

    return GiphyModel.extend('GiphyModel', {

        /**
         * Set Giphy embed code
         * @member GiphyModel
         * @param {string} embed
         */
        setGiphyEmbedCode: function setGiphyEmbedCode(embed) {
            this.setPrefs('giphyEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
