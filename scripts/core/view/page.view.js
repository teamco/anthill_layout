/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header',
    'element/footer',
    'element/page/content',
    'element/page/page',
    'element/page/delta.scroll'
], function definePageView(BaseView, Header, Footer, Content, Page, DeltaScroll){

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        /**
         * Render Page
         */
        renderPage: function renderPage() {
            this.elements.$page = new Page(this, {
                id: this.createId(),
                style: this.getContainerClassName(),
                $container: this.getContainerSelector()
            });
            this.header(Header, this.elements.$page);
            this.widgets();
            this.deltaScroll();
            this.footer(Footer, this.elements.$page);

            this.elements.$page.stretch();
        },
        deltaScroll: function deltaScroll() {
            this.elements.$deltaScroll = new DeltaScroll(this, {
                $container: this.elements.$page.$,
                style: 'delta-scroll'
            });
        },
        widgets: function widgets() {
            this.elements.$widgets = new Content(this, {
                style: 'widgets',
                $container: this.elements.$page.$
            });
        },
        render: function render() {
            this.scope.observer.publish(this.scope.eventmanager.eventList.successRendered);
        }
    }, BaseView.prototype)

});