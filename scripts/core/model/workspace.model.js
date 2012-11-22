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
            var workspace = this.scope;
            workspace.page = this.updateCollector(
                new Page(this.base.define(page, {}, true)),
                workspace.pages
            );
            return workspace.page;
        },
        destroyPage: function destroyPage(page) {
            var scope = this.scope,
                pages = scope.pages,
                index = page.model.getUUID();

            if (pages.hasOwnProperty(index)) {
                delete pages[index];
            }

            this.scope.page = this.base.lib.hash.firstHashElement(pages);

            return pages;

        },
        destroyPages: function destroyPage(force) {
            var index,
                pages = this.scope.pages;
            for (index in pages) {
                if (pages.hasOwnProperty(index)) {
                    this.destroy(pages[index])
                }
            }
            return pages;
        }

    }, BaseModel.prototype, Base);
});