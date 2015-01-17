/**
 * Created by i061485 on 7/31/14.
 */

define([
    'modules/Element'
], function defineSiteConfigActivateElement(BaseElement) {

    /**
     * Define SiteConfigActivateElement
     * @class SiteConfigActivateElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends BaseElement
     * @returns {SiteConfigActivateElement}
     */
    var SiteConfigActivateElement = function SiteConfigActivateElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.renderContent();

        return this;
    };

    return SiteConfigActivateElement.extend('SiteConfigActivateElement', {

        renderContent: function renderContent() {
        }

    }, BaseElement.prototype);
});