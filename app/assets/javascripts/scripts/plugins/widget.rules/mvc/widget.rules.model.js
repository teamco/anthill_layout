/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineWidgetRulesModel(BaseModel) {

    /**
     * Define WidgetRules model
     * @extends BaseModel
     * @class WidgetRulesModel
     * @constructor
     */
    var WidgetRulesModel = function WidgetRulesModel() {

        /**
         * Define data
         * @memberOf WidgetRulesModel
         * @type {{}}
         */
        this.data = {};
    };

    return WidgetRulesModel.extend('WidgetRulesModel', {

        /**
         * Get items
         * @memberOf WidgetRulesModel
         * @param page
         * @returns {*}
         */
        getWidgetRules: function getWidgetRules(page) {
            return page.model.getItems();
        },

        /**
         * Collect items
         * @memberOf WidgetRulesModel
         * @param item
         */
        collectItems: function collectItems(item) {
            this.data[item.model.getUUID()] = item;
        },

        /**
         * Get data
         * @memberOf WidgetRulesModel
         * @returns {{}}
         */
        getCollectedItems: function getCollectedItems() {
            return this.data;
        }

    }, BaseModel.prototype);
});