/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function definePageDataModel(BaseModel) {

    /**
     * Define PageData model
     * @mixin BaseModel
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        this.preferences = {};
    };

    return Model.extend({

        /**
         * Get items
         * @param page
         * @returns {*}
         */
        getPageData: function getPageData(page) {
            return page.model.getItems();
        },

        /**
         * Define preferences
         * @param widget
         */
        definePreferences: function definePreferences(widget) {

            this.preferences[widget.model.getConfig('resource')] =
                widget.controller.getContent().model.preferences;
        }

    }, BaseModel.prototype);
});