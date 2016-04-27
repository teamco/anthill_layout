/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineKitchenbowlPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Kitchenbowl Preferences Element
     * @constructor
     * @class KitchenbowlPreferencesElement
     * @param {KitchenbowlView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {KitchenbowlPreferencesElement}
     */
    var KitchenbowlPreferencesElement = function KitchenbowlPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return KitchenbowlPreferencesElement.extend(
        'KitchenbowlPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
