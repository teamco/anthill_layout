/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
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
            $container: opts.$container
        });

        this.addCSS('page.data');
        this.addCSS('preferences');

        return this;
    };

    return PageDataElement.extend('PageDataElement', {
    }, BaseElement.prototype);
});