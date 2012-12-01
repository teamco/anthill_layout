/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/application/application',
    'element/application/header',
    'element/application/footer',
    'element/application/content'
], function defineApplicationView(BaseView, AppHTML, Header, Footer, WorkspaceContainer){

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        application: function application() {
            var scope = this.scope;
            this.elements.$application = new AppHTML(this, {
                id: this.createId(),
                style: this.getContainerClassName(),
                $container: this.getConfigHTML().container
            });
            this.header(Header, this.elements.$application);
            this.workspaces();
            this.footer(Footer, this.elements.$application);
        },
        workspaces: function workspaces() {
            this.elements.$workspaces = new WorkspaceContainer(this, {
                $container: this.elements.$application.$,
                style: 'workspaces'
            });
        },
        render: function render() {
            this.application();
        }
    }, BaseView.prototype)

});