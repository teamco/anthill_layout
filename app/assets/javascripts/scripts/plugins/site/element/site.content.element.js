/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSiteContentElement(BaseElement) {

    /**
     * Define Site Content Element
     * @param view
     * @param opts
     * @returns {SiteContentElement}
     * @constructor
     * @class SiteContentElement
     * @extends BaseElement
     */
    var SiteContentElement = function SiteContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        return this;
    };

    return SiteContentElement.extend('SiteContentElement', {



    }, BaseElement.prototype);

});