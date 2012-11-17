/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model',
    'modules/base',
    'controller/page/page'
], function defineWorkspaceModel(BaseModel, Base, Page) {
    var Model = function Model() {

    };

    return Model.extend({
        createPage: function createPage(page) {
            var workspace = this.workspace;
            workspace.page = new Page(this.base.define(page, {}, true));
            workspace.pages[workspace.page.config.uuid] = workspace.page;
        }
    }, BaseModel.prototype, Base);
});