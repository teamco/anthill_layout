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
], function defineTextEditorModel(BaseModel, WidgetContentModel) {

    /**
     * Define TextEditor model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TextEditorModel
     * @constructor
     */
    var TextEditorModel = function TextEditorModel() {

        /**
         * Define preferences
         * @member TextEditorModel
         * @type {{
         *      bodyHtml: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            bodyHtml: {
                type: 'texteditor',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member TextEditorModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TextEditorModel.extend('TextEditorModel', {

        /**
         * Set body html
         * @member TextEditorModel
         * @param {text} html
         */
        setBodyHtml: function setBodyHtml(html) {
            this.setPrefs('bodyHtml', html);
        }


    }, BaseModel.prototype, WidgetContentModel.prototype);
});