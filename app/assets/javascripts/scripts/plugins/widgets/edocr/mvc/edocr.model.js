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
], function defineEdocrModel(BaseModel, WidgetContentModel) {

    /**
     * Define Edocr model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class EdocrModel
     * @constructor
     */
    var EdocrModel = function EdocrModel() {

        /**
         * Define preferences
         * @property EdocrModel
         * @type {{edocrEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            edocrEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<div style="text-align: center;"><iframe height="550" width="425" src="https://www.edocr.com/embed/aodkybbx"></iframe><p style="text-align: center; font-size: .8em;"><a href="https://www.edocr.com" target="_blank">View more on edocr</a></p></div>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property EdocrModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EdocrModel.extend('EdocrModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
