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
                id: this.createId(),
                style: this.getContainerClassName(),
                $container: this.getContainerSelector()
            });
            this.header(Header, this.elements.$page);
            this.widgets();
            this.footer(Footer, this.elements.$page);
        },
        widgets: function widgets() {
            this.elements.$widgets = new Content(this, {
                style: 'widgets',
                $container: this.elements.$page.$
            });
        },
        render: function render() {
            this.page();
        }
    }, BaseView.prototype)

});