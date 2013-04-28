/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function defineBaseView(Base) {
    var BaseView = function BaseView() {

    };

    return BaseView.extend({
        getConfigHTML: function getConfigHTML(key) {
            var html = this.scope.model.getConfig('html');
            if (this.base.isDefined(key)) {
                return html[key];
            }
            return html;
        },
        createStyle: function createStyle() {
            return [
                this.getContainerClassName(),
                this.getConfigHTML('style')
            ].join(' ');
        },
        createUUID: function createUUID() {
            return [
                this.scope.model.getUUID(),
                this.getContainerClassName()
            ].join('-');
        },
        renderUUID: function renderUUID(id) {
            return id || (this.base.lib.generator.UUID() +
                this.constructor.name.toDash());
        },
        getContainerClassName: function getContainerClassName() {
            return this.getConfigHTML().selector.replace(/\./, '');
        },
        getContainerSelector: function getContainerSelector() {
            var html = this.getConfigHTML();
            return $(html.container).find([
                '.', this.getContainerClassName(), 's'
            ].join(''));
        },
        header: function header(Header, $container) {
            this.elements.$header = new Header(this, {
                style: this.scope.constructor.name.toLowerCase() + '-header',
                $container: $container.$
            });
        },
        footer: function footer(Footer, $container) {
            this.elements.$footer = new Footer(this, {
                style: this.scope.constructor.name.toLowerCase() + '-footer',
                $container: $container.$
            });
        }
    }, Base);
});