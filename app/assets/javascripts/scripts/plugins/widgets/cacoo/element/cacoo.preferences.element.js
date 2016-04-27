/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineCacooPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Cacoo Preferences Element
     * @constructor
     * @class CacooPreferencesElement
     * @param {CacooView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {CacooPreferencesElement}
     */
    var CacooPreferencesElement = function CacooPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return CacooPreferencesElement.extend(
        'CacooPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
