/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/page/header',
    'element/page/footer',
    'element/page/content',
    'element/page/page'
], function definePageView(BaseView, Header, Footer, Content, Page){

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        page: function page() {
            this.elements.$page = new Page(this, {
                id: this.scope.config.uuid + '-page',
                style: 'page-container',
                $container: this.getConfigHTML().container
            });
            this.header(Header, this.elements.$page);
            this.content();
            this.footer(Footer, this.elements.$page);
        },
        content: function content() {
            this.elements.$content = new Content(this, {
                style: 'page',
                $container: this.elements.$page.$
            });
        },
        render: function render() {
            this.page();
        }
    }, BaseView.prototype)

});