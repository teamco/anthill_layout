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
], function defineTitleModel(BaseModel, WidgetContentModel) {

    /**
     * Define Title model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TitleModel
     * @constructor
     */
    var TitleModel = function TitleModel() {

        /**
         * Define preferences
         * @property TitleModel
         * @type {{titleText: {type: string, disabled: boolean, value: undefined, visible: boolean}}}
         */
        this.preferences = {
            titleText: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @property TitleModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TitleModel.extend('TitleModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
