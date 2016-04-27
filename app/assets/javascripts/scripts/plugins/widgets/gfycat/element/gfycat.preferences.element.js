/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineGfycatPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Gfycat Preferences Element
     * @constructor
     * @class GfycatPreferencesElement
     * @param {GfycatView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {GfycatPreferencesElement}
     */
    var GfycatPreferencesElement = function GfycatPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return GfycatPreferencesElement.extend(
        'GfycatPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
