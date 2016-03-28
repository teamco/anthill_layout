/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineLoginPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Login Preferences Element
     * @param view
     * @param opts
     * @returns {LoginPreferencesElement}
     * @constructor
     * @class LoginPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var LoginPreferencesElement = function LoginPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LoginPreferencesElement.extend('LoginPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});