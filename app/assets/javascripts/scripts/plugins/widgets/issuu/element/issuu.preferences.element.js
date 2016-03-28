/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineIssuuPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Issuu Preferences Element
     * @param view
     * @param opts
     * @returns {IssuuPreferencesElement}
     * @constructor
     * @class IssuuPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var IssuuPreferencesElement = function IssuuPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return IssuuPreferencesElement.extend('IssuuPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
