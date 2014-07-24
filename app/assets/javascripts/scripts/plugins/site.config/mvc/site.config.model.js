/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineSiteConfigModel(BaseModel) {

    /**
     * Define SiteConfig model
     * @class SiteConfigModel
     * @constructor
     * @extends BaseModel
     */
    var SiteConfigModel = function SiteConfigModel() {

        /**
         * Define preferences
         * @member SiteConfigModel
         * @type {{url: string}}
         */
        this.preferences = {
        };
    };

    return SiteConfigModel.extend('SiteConfigModel', {

        /**
         * Get data items
         * @member SiteConfigModel
         */
        getDataItems: function getDataItems(workspace) {
            return workspace.model.getItems();
        }

    }, BaseModel.prototype);
});