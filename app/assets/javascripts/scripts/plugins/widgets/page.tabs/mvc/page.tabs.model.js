/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function definePageTabsModel(BaseModel) {

    /**
     * Define PageTabs model
     * @extends BaseModel
     * @class PageTabsModel
     * @constructor
     */
    var PageTabsModel = function PageTabsModel() {

        /**
         * Define preferences
         * @member PageTabsModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member PageTabsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PageTabsModel.extend('PageTabsModel', {


    }, BaseModel.prototype);
});