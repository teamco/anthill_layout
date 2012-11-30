/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
], function defineBaseView() {
    var BaseView = function BaseView() {

    };

    return BaseView.extend({
        getConfigHTML: function getConfigHTML() {
            return this.scope.model.getConfig().html;
        },
        getContainerClassName: function getContainerClassName() {
            return this.getConfigHTML().selector.replace(/\./,'');
        },
        header: function header(Header, $container) {
            this.elements.$header = new Header(this, {
                style: 'header',
                $container: $container.$
            });
        },
        footer: function footer(Footer, $container) {
            this.elements.$footer = new Footer(this, {
                style: 'footer',
                $container: $container.$
            });
        }
    });
});