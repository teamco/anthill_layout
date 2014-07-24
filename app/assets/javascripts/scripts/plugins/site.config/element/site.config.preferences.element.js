/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/pages.preferences'
], function defineSiteConfigPreferencesElement(BaseElement, PagesPreferences) {

    /**
     * Define SiteConfig Preferences Element
     * @param view
     * @param opts
     * @returns {SiteConfigPreferencesElement}
     * @constructor
     * @class SiteConfigPreferencesElement
     * @extends BaseElement
     * @extends PagesPreferences
     */
    var SiteConfigPreferencesElement = function SiteConfigPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts);

        return this;
    };

    return SiteConfigPreferencesElement.extend('SiteConfigPreferencesElement', {


    }, BaseElement.prototype, PagesPreferences.prototype);

});