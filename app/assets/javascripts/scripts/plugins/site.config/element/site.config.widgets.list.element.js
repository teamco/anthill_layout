/**
 * Created by i061485 on 7/31/14.
 */

define([
    'modules/Element'
], function defineSiteConfigWidgetsListElement(BaseElement) {

    /**
     * Define SiteConfigWidgetsListElement
     * @class SiteConfigWidgetsListElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends BaseElement
     * @returns {SiteConfigWidgetsListElement}
     */
    var SiteConfigWidgetsListElement = function SiteConfigWidgetsListElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });

        return this;
    };

    return SiteConfigWidgetsListElement.extend('SiteConfigWidgetsListElement', {

    }, BaseElement.prototype);
});