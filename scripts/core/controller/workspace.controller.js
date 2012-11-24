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
        createPage: function createPage(opts) {
            var page = this.model.createPage(opts);
            this.logger.info(
                'Create Page',
                page.model.getUUID(),
                page
            );
        },
        destroyPage: function destroyPage(page) {
            var pages = this.model.destroyPage(page);
            this.logger.info(
                'Destroy Page',
                page,
                pages
            );
        },
        destroyPages: function destroyPages() {
            var pages = this.model.destroyPages();
            this.logger.info(
                'Destroy Pages',
                pages
            );
        }
    }, BaseController.prototype);
});