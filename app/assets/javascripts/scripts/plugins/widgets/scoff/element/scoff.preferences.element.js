/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineScoffPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Scoff Preferences Element
     * @constructor
     * @class ScoffPreferencesElement
     * @param {ScoffView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {ScoffPreferencesElement}
     */
    var ScoffPreferencesElement = function ScoffPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ScoffPreferencesElement.extend(
        'ScoffPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
