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
], function defineTnaFlixModel(BaseModel, WidgetContentModel) {

    /**
     * Define TnaFlix model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TnaFlixModel
     * @constructor
     */
    var TnaFlixModel = function TnaFlixModel() {

        /**
         * Define preferences
         * @member TnaFlixModel
         * @type {{
         *      tnaflixEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            tnaflixEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member TnaFlixModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TnaFlixModel.extend('TnaFlixModel', {

        /**
         * Set TnaFlix embed code
         * @member TnaFlixModel
         * @param {string} embed
         */
        setTnaflixEmbedCode: function setTnaflixEmbedCode(embed) {
            this.setPrefs('tnaflixEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
