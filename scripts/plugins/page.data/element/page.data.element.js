/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePageDataElement(BaseElement) {

    /**
     * Define PageData Element
     * @param view
     * @param opts
     * @returns {PageDataElement}
     * @constructor
     * @class PageDataElement
     * @extends BaseElement
     */
    var PageDataElement = function PageDataElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('page.data');

        return this;
    };

    return PageDataElement.extend('PageDataElement', {

    }, BaseElement.prototype);

});