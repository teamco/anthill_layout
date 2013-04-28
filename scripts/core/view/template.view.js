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
], function defineTemplateView(BaseView, Header, Footer, TemplateHTML, Content) {

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        renderTemplate: function renderTemplate() {
            this.elements.$template = new TemplateHTML(this, {
                $container: this.getConfigHTML().container
            });
            this.header(Header, this.elements.$template);
            this.widgets();
            this.footer(Footer, this.elements.$template);
        },
        widgets: function widgets() {
            this.elements.$widgets = new Content(this, {
                style: 'widgets',
                $container: this.elements.$template.$
            });
        },
        render: function render() {
            this.scope.observer.publish(this.scope.eventmanager.eventList.successRendered);
        }
    }, BaseView.prototype)

});