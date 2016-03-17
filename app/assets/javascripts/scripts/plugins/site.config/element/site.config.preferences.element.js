/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/site.preferences'
], function defineSiteConfigPreferencesElement(BaseElement, SitePreferences) {

    /**
     * Define SiteConfig Preferences Element
     * @constructor
     * @class SiteConfigPreferencesElement
     * @extends BaseElement
     * @extends SitePreferences
     * @param view
     * @param opts
     * @returns {SiteConfigPreferencesElement}
     */
    var SiteConfigPreferencesElement = function SiteConfigPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.$.append(
            this.getPreferencesHtml(opts.map)
        );

        return this;
    };

    return SiteConfigPreferencesElement.extend(
        'SiteConfigPreferencesElement', {},
        BaseElement.prototype,
        SitePreferences.prototype
    );
});