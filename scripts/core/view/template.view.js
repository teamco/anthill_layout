/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/template/template'
], function defineTemplateView(BaseView, TemplateHTML) {

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        template: function template() {
            var id = this.createId();
            this.elements[id] = new TemplateHTML(this, {
                id: id,
                style: this.getContainerClassName(),
                $container: this.getConfigHTML().container
            });
        },
        render: function render() {
            this.template();
        }
    }, BaseView.prototype)

});