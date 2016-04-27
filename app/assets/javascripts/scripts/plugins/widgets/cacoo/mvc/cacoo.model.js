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
], function defineCacooModel(BaseModel, WidgetContentModel) {

    /**
     * Define Cacoo model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class CacooModel
     * @constructor
     */
    var CacooModel = function CacooModel() {

        /**
         * Define preferences
         * @property CacooModel
         * @type {{cacooEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            cacooEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="https://cacoo.com/diagrams/pByowlpiZ7YTV7UN/view?w=600&h=500&sn=2" width="602" height="530" frameborder="0" scrolling="no"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property CacooModel
         * @type {{}}
         */
        this.rules = {};
    };

    return CacooModel.extend(
        'CacooModel', {}, 
        BaseModel.prototype, 
        WidgetContentModel.prototype
    );
});
