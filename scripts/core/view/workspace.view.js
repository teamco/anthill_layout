/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/workspace/wrapper',
    'element/workspace/header',
    'element/workspace/footer',
    'element/workspace/content'
], function defineWorkspaceView(BaseView, Wrapper, Header, Footer, PageContainer){

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        workspace: function workspace() {
            this.elements.$workspace = new Wrapper(this, {
                id: this.createId(),
                style: this.getContainerClassName(),
                $container: this.getContainerSelector()
            });
            this.header(Header, this.elements.$workspace);
            this.pages();
            this.footer(Footer, this.elements.$workspace);
        },
        pages: function pages() {
            this.elements.$pages = new PageContainer(this, {
                $container: this.elements.$workspace.$,
                style: 'pages'
            });
        },
        render: function render() {
            this.workspace();
        }
    }, BaseView.prototype)

});