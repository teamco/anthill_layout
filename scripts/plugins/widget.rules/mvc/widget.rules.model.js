/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineWidgetRulesModel(BaseModel) {

    /**
     * Define WidgetRules model
     * @extends BaseModel
     * @class WidgetRulesModel
     * @constructor
     */
    var WidgetRulesModel = function WidgetRulesModel() {

    };

    return WidgetRulesModel.extend('WidgetRulesModel', {

        /**
         * Get items
         * @member WidgetRulesModel
         * @param page
         * @returns {*}
         */
        getWidgetRules: function getWidgetRules(page) {
            return page.model.getItems();
        }

    }, BaseModel.prototype);
});