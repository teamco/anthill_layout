/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineVineCoPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define VineCo Preferences Element
     * @param view
     * @param opts
     * @returns {VineCoPreferencesElement}
     * @constructor
     * @class VineCoPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var VineCoPreferencesElement = function VineCoPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return VineCoPreferencesElement.extend('VineCoPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
