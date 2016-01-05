/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function definePageElement(BaseElement) {

    /**
     * Define page element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class PageElement
     * @extends BaseElement
     */
    var PageElement = function PageElement(view, opts) {
        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container
        });
    };

    return PageElement.extend('PageElement', {

        /**
         * Set page padding
         * @param padding
         * @memberOf PageElement
         */
        setPadding: function setPadding(padding) {

            this.view.elements.$widgets.$.css({
                paddingTop: padding.top,
                paddingRight: padding.right,
                paddingBottom: padding.bottom,
                paddingLeft: padding.left
            });
        }

    }, BaseElement.prototype);
});