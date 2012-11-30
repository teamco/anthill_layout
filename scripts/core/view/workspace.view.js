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
    'element/workspace/page.container'
], function defineWorkspaceView(BaseView, Wrapper, Header, Footer, PageContainer){

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        wrapper: function wrapper() {
            this.elements.$wrapper = new Wrapper(this, {
                id: this.scope.config.uuid + '-wrapper',
                style: 'wrapper',
                $container: this.getConfigHTML().container
            });
            this.header(Header, this.elements.$wrapper);
            this.pageContainer();
            this.footer(Footer, this.elements.$wrapper);
        },
        pageContainer: function pageContainer() {
            this.elements.$pageContainer = new PageContainer(this, {
                $container: this.elements.$wrapper.$
            });
        },
        render: function render() {
            this.wrapper();
        }
    }, BaseView.prototype)

});