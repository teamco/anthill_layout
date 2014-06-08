/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineWorkspaceDataModel(BaseModel) {

    /**
     * Define WorkspaceData model
     * @class WorkspaceDataModel
     * @constructor
     * @extends BaseModel
     */
    var WorkspaceDataModel = function WorkspaceDataModel() {

        /**
         * Define preferences
         * @member WorkspaceDataModel
         * @type {{url: string}}
         */
        this.preferences = {
        };
    };

    return WorkspaceDataModel.extend('WorkspaceDataModel', {

        /**
         * Get data items
         * @member WorkspaceDataModel
         */
        getDataItems: function getDataItems(workspace) {
            return workspace.model.getItems();
        }

    }, BaseModel.prototype);
});