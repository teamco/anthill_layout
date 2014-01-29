/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function definePageElement(BaseElement) {

    /**
     * Define page element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class PageElement
     */
    var PageElement = function PageElement(view, opts) {
        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return PageElement.extend({

//        /**
//         * Define page height
//         */
//        defineHeight: function defineHeight() {
//            var header = this.view.elements.$header,
//                footer = this.view.elements.$footer,
//                $container = this.getRootContainer();
//
//            var headerHeight = header.$ ? header.$.height() : 0,
//                footerHeight = footer.$ ? footer.$.height() : 0,
//                containerHeight = $container.height();
//
//            this.setHeight(containerHeight - (headerHeight + footerHeight));
//        }

    }, BaseElement.prototype);
});