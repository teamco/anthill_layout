/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/controller'
], function defineWorkspaceController(BaseController) {
    var Controller = function Controller() {
    };

    return Controller.extend({
        createPage: function createPage() {
            var page = this.model.createPage();
            this.logger.info(
                'createPage',
                page.model.getUUID(),
                page
            );
        },
        destroyPage: function destroyPage(page) {
            var pages = this.model.destroyPage(page);
            this.logger.info(
                'destroyPage',
                page.model.getUUID(),
                pages
            );
        },
        destroyPages: function destroyPages() {
            var pages = this.model.destroyPages();
            this.logger.info(
                'destroyPages',
                pages
            );
        }
    }, BaseController.prototype);
});