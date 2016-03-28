/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineLoginGooglePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define LoginGoogle Preferences Element
     * @param view
     * @param opts
     * @returns {LoginGooglePreferencesElement}
     * @constructor
     * @class LoginGooglePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var LoginGooglePreferencesElement = function LoginGooglePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LoginGooglePreferencesElement.extend('LoginGooglePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});