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
], function defineAnimotoModel(BaseModel, WidgetContentModel) {

    /**
     * Define Animoto model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class AnimotoModel
     * @constructor
     */
    var AnimotoModel = function AnimotoModel() {

        /**
         * Define preferences
         * @property AnimotoModel
         * @type {{
         *      animotoEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            animotoEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @property AnimotoModel
         * @type {{}}
         */
        this.rules = {};
    };

    return AnimotoModel.extend('AnimotoModel', {

        /**
         * Set Animoto Url
         * @memberOf AnimotoModel
         * @param {string} embed
         */
        setAnimotoEmbedCode: function setAnimotoEmbedCode(embed) {
            this.setPrefs('animotoEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
