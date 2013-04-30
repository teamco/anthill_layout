/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/workspace/workspace.element',
    'element/header.element',
    'element/footer.element',
    'element/workspace/workspace.element.content'
], function defineWorkspaceView(BaseView, Workspace, Header, Footer, PageContainer) {

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        renderWorkspace: function renderWorkspace() {
            this.elements.$workspace = new Workspace(this, {
                id: this.createUUID(),
                $container: this.getContainerSelector()
            });
            this.header(Header, this.elements.$workspace);
            this.pages();
            this.footer(Footer, this.elements.$workspace);

            this.elements.$workspace.stretch();
        },
        pages: function pages() {
            this.elements.$pages = new PageContainer(this, {
                $container: this.elements.$workspace.$,
                style: 'pages'
            });
        },
        render: function render() {
            this.scope.observer.publish(this.scope.eventmanager.eventList.successRendered);
        }
    }, BaseView.prototype)

});