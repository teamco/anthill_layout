/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'element/template/template.element',
    'element/template/template.element.content'
], function defineTemplateView(BaseView, Header, Footer, TemplateHTML, PageContainer) {

    var View = function View() {
    };

    return View.extend('View', {

        renderTemplate: function renderTemplate($container) {
            this.elements.$template = new TemplateHTML(this, {
                id: this.createUUID(),
                $container: $container,
                style: 'template-content'
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

        render: function render(silent, widget) {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                [widget.view.elements.$widget.getContent(), silent]
            );
        }

    }, BaseView.prototype)

});