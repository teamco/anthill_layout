/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery'
], function defineBaseView($) {
    var BaseView = function BaseView() {

    };

    return BaseView.extend({
        getConfigHTML: function getConfigHTML() {
            return this.scope.model.getConfig().html;
        },
        createId: function createId() {
            return [
                this.scope.model.getUUID(),
                this.getContainerClassName()
            ].join('-');
        },
        getContainerClassName: function getContainerClassName() {
            return this.getConfigHTML().selector.replace(/\./, '');
        },
        getContainerSelector: function getContainerSelector() {
            var html = this.getConfigHTML(),
                containerClassName = html.container.split(/-/).reverse().splice(0, 1);
            return $(html.container).find([
                '.', this.getContainerClassName(), 's'
            ].join(''));
        },
        header: function header(Header, $container) {
            this.elements.$header = new Header(this, {
                style: this.scope.constructor.getConstructorName().toLowerCase() + '-header',
                $container: $container.$
            });
        },
        footer: function footer(Footer, $container) {
            this.elements.$footer = new Footer(this, {
                style: this.scope.constructor.getConstructorName().toLowerCase() + '-footer',
                $container: $container.$
            });
        }
    });
});