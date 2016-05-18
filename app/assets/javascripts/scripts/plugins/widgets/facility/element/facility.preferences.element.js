/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineFacilityPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Facility Preferences Element
     * @constructor
     * @class FacilityPreferencesElement
     * @param {FacilityView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {FacilityPreferencesElement}
     */
    var FacilityPreferencesElement = function FacilityPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FacilityPreferencesElement.extend(
        'FacilityPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
