/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSketchfabPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Sketchfab Preferences Element
     * @constructor
     * @class SketchfabPreferencesElement
     * @param {SketchfabView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {SketchfabPreferencesElement}
     */
    var SketchfabPreferencesElement = function SketchfabPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SketchfabPreferencesElement.extend(
        'SketchfabPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
