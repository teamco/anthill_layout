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
], function defineHeaderModel(BaseModel, WidgetContentModel) {

    /**
     * Define Header model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class HeaderModel
     * @constructor
     */
    var HeaderModel = function HeaderModel() {

        /**
         * Define preferences
         * @memberOf HeaderModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @memberOf HeaderModel
         * @type {{}}
         */
        this.rules = {};
    };

    return HeaderModel.extend('HeaderModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});