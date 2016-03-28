/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineOnePlusOnePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define OnePlusOne Preferences Element
     * @param view
     * @param opts
     * @returns {OnePlusOnePreferencesElement}
     * @constructor
     * @class OnePlusOnePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var OnePlusOnePreferencesElement = function OnePlusOnePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OnePlusOnePreferencesElement.extend('OnePlusOnePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
