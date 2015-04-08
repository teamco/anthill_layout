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
], function defineScribdModel(BaseModel, WidgetContentModel) {

    /**
     * Define Scribd model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ScribdModel
     * @constructor
     */
    var ScribdModel = function ScribdModel() {

        /**
         * Define preferences
         * @memberOf ScribdModel
         * @type {{
         *      scribdEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            scribdEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf ScribdModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ScribdModel.extend('ScribdModel', {

        /**
         * Set Scribd embed code
         * @memberOf ScribdModel
         * @param {string} embed
         */
        setScribdEmbedCode: function setScribdEmbedCode(embed) {
            this.setPrefs('scribdEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
