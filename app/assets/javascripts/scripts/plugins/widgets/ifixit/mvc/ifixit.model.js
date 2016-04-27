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
], function defineIfixitModel(BaseModel, WidgetContentModel) {

    /**
     * Define Ifixit model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class IfixitModel
     * @constructor
     */
    var IfixitModel = function IfixitModel() {

        /**
         * Define preferences
         * @property IfixitModel
         * @type {{ifixitEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            ifixitEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="https://www.ifixit.com/Guide/embed/59737" width="800" height="584" allowfullscreen frameborder="0"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property IfixitModel
         * @type {{}}
         */
        this.rules = {};
    };

    return IfixitModel.extend('IfixitModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
