/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSitePreferencesContentElement(BaseElement) {

    /**
     * Define SitePreferences Content Element
     * @param view
     * @param opts
     * @returns {SitePreferencesContentElement}
     * @constructor
     * @class SitePreferencesContentElement
     * @extends BaseElement
     */
    var SitePreferencesContentElement = function SitePreferencesContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        return this;
    };

    return SitePreferencesContentElement.extend('SitePreferencesContentElement', {



    }, BaseElement.prototype);

});