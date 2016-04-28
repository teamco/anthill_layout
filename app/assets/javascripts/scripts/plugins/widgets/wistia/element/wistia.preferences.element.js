/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineWistiaPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Wistia Preferences Element
     * @constructor
     * @class WistiaPreferencesElement
     * @param {WistiaView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {WistiaPreferencesElement}
     */
    var WistiaPreferencesElement = function WistiaPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return WistiaPreferencesElement.extend(
        'WistiaPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
