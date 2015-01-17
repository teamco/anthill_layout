/**
 * Created by i061485 on 7/31/14.
 */

define([
    'modules/Element'
], function defineSiteConfigPublishElement(BaseElement) {

    /**
     * Define SiteConfigPublishElement
     * @class SiteConfigPublishElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends BaseElement
     * @returns {SiteConfigPublishElement}
     */
    var SiteConfigPublishElement = function SiteConfigPublishElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.renderContent();

        return this;
    };

    return SiteConfigPublishElement.extend('SiteConfigPublishElement', {

        renderContent: function renderContent() {
        }

    }, BaseElement.prototype);
});