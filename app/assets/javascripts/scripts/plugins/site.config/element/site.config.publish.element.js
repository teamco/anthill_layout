/**
 * Created by teamco on 7/31/14.
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
     * @extends Renderer
     * @returns {SiteConfigPublishElement}
     */
    var SiteConfigPublishElement = function SiteConfigPublishElement(view, opts) {

        this._config(view, opts, $('<div class="publish" />')).build({
            $container: opts.$container
        });

        this.renderContent();

        return this;
    };

    return SiteConfigPublishElement.extend('SiteConfigPublishElement', {

        /**
         * Render content
         * @memberOf SiteConfigPublishElement
         */
        renderContent: function renderContent() {

        }

    }, BaseElement.prototype);
});