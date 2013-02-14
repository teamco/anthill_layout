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
        getCurrentPage: function getCurrentPage() {
            return this.scope.page;
        },
        setCurrentPage: function setCurrentPage(page) {
            this.scope.page = page;
            return this.getCurrentPage();
        },
        setPageContainerHeight: function setPageContainerHeight() {
            this.view.elements.$pages.defineHeight();
        }

    }, BaseController.prototype);
});