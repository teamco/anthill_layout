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
], function defineCodepointsModel(BaseModel, WidgetContentModel) {

    /**
     * Define Codepoints model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class CodepointsModel
     * @constructor
     */
    var CodepointsModel = function CodepointsModel() {

        /**
         * Define preferences
         * @property CodepointsModel
         * @type {{codepointsEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            codepointsEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="https://codepoints.net/U+11104?embed" style="width: 200px; height: 26px;border: 1px solid #444;"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property CodepointsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return CodepointsModel.extend('CodepointsModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
