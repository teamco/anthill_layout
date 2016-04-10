/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineHereMapsForLifePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define HereMapsForLife Preferences Element
     * @constructor
     * @class HereMapsForLifePreferencesElement
     * @param {HereMapsForLifeView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {HereMapsForLifePreferencesElement}
     */
    var HereMapsForLifePreferencesElement = function HereMapsForLifePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return HereMapsForLifePreferencesElement.extend(
        'HereMapsForLifePreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
