/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function definePage(Base, BaseElement) {

    var Page = function Page(view, opts) {
        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return Page.extend({
        defineHeight: function defineHeight() {
            var header = this.view.elements.$header,
                footer = this.view.elements.$footer,
                $container = this.getRootContainer();

            var headerHeight = header.$ ? header.$.height() : 0,
                footerHeight = footer.$ ? footer.$.height() : 0,
                containerHeight = $container.height();

            this.setHeight(containerHeight - (headerHeight + footerHeight));
        }

    }, Base, BaseElement.prototype);
});