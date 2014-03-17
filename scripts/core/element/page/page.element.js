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
     * @extends BaseElement
     */
    var PageElement = function PageElement(view, opts) {
        return this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return PageElement.extend({

    }, BaseElement.prototype);
});