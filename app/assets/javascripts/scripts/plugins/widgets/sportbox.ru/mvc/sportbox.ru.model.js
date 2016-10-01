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
], function defineSportboxRuModel(BaseModel, WidgetContentModel) {

    /**
     * Define SportboxRu model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SportboxRuModel
     * @constructor
     */
    var SportboxRuModel = function SportboxRuModel() {

        /**
         * Define preferences
         * @property SportboxRuModel
         * @type {{sportboxEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            sportboxEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="http://news.sportbox.ru/vdl/poster/658447" width="450" height="253" scrolling="no" frameborder="0" style="width:100%; max-width:450px;"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property SportboxRuModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SportboxRuModel.extend('SportboxRuModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
