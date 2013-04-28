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
    'element/template/template',
    'element/template/content'
], function defineTemplateView(BaseView, Header, Footer, TemplateHTML, PageContainer) {

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        renderTemplate: function renderTemplate($container) {
            this.elements.$template = new TemplateHTML(this, {
                id: this.createUUID(),
                $container: $container,
                style: 'pages'
            });

            this.header(Header, this.elements.$template);
            this.pages();
            this.footer(Footer, this.elements.$template);
        },
        pages: function pages() {
            this.elements.$pages = new PageContainer(this, {
                $container: this.elements.$template.$,
                style: 'pages'
            });
        },
        render: function render(widget) {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                widget.view.elements.$widget.getContent()
            );
        }
    }, BaseView.prototype)

});