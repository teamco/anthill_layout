/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineDotsubPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Dotsub Preferences Element
     * @constructor
     * @class DotsubPreferencesElement
     * @param {DotsubView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {DotsubPreferencesElement}
     */
    var DotsubPreferencesElement = function DotsubPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return DotsubPreferencesElement.extend(
        'DotsubPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
