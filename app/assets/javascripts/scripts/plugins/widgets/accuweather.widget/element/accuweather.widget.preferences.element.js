/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineAccuweatherWidgetPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define AccuweatherWidget Preferences Element
     * @constructor
     * @class AccuweatherWidgetPreferencesElement
     * @param {AccuweatherWidgetView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {AccuweatherWidgetPreferencesElement}
     */
    var AccuweatherWidgetPreferencesElement = function AccuweatherWidgetPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return AccuweatherWidgetPreferencesElement.extend(
        'AccuweatherWidgetPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
