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
], function defineMusTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define MusTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class MusTvModel
     * @constructor
     */
    var MusTvModel = function MusTvModel() {

        /**
         * Define preferences
         * @memberOf MusTvModel
         * @type {{
         *      mustvEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            mustvEmbedCode: {
                type: 'text',
                disabled: true,
                value: 'https://www.youtube.com/watch?v=JpqyG-Y4WwU',
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf MusTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return MusTvModel.extend('MusTvModel', {

        /**
         * Set MusTv embed code
         * @memberOf MusTvModel
         * @param {string} embed
         */
        setMustvEmbedCode: function setMustvEmbedCode(embed) {
            this.setPrefs('mustvEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
