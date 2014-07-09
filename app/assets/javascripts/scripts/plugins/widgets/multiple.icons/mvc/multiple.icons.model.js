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
], function defineMultipleIconsModel(BaseModel, WidgetContentModel) {

    /**
     * Define MultipleIcons model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class MultipleIconsModel
     * @constructor
     */
    var MultipleIconsModel = function MultipleIconsModel() {

        /**
         * Define preferences
         * @member MultipleIconsModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member MultipleIconsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return MultipleIconsModel.extend('MultipleIconsModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});