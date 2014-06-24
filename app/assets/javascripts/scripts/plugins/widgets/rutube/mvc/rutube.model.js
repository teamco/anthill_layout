/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineRutubeModel(BaseModel) {

    /**
     * Define Rutube model
     * @extends BaseModel
     * @class RutubeModel
     * @constructor
     */
    var RutubeModel = function RutubeModel() {

        /**
         * Define preferences
         * @member RutubeModel
         * @type {{
         *      rutubeEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            rutubeEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member RutubeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return RutubeModel.extend('RutubeModel', {

        /**
         * Set Rutube embed code
         * @member RutubeModel
         * @param {string} embed
         */
        setRutubeEmbedCode: function setRutubeUrl(embed) {
            this.setPrefs('rutubeEmbedCode', embed);
        }

    }, BaseModel.prototype);
});