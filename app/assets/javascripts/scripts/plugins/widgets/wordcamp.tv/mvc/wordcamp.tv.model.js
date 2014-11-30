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
], function defineWordcampTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define WordcampTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class WordcampTvModel
     * @constructor
     */
    var WordcampTvModel = function WordcampTvModel() {

        /**
         * Define preferences
         * @member WordcampTvModel
         * @type {{
         *      wordcamptvEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            wordcamptvEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member WordcampTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return WordcampTvModel.extend('WordcampTvModel', {

        /**
         * Set WordcampTv embed code
         * @member WordcampTvModel
         * @param {string} embed
         */
        setWordcamptvEmbedCode: function setWordcamptvEmbedCode(embed) {
            this.setPrefs('wordcamptvEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
