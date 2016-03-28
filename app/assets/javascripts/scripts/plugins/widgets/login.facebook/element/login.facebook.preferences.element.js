/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineLoginFacebookPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define LoginFacebook Preferences Element
     * @param view
     * @param opts
     * @returns {LoginFacebookPreferencesElement}
     * @constructor
     * @class LoginFacebookPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var LoginFacebookPreferencesElement = function LoginFacebookPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LoginFacebookPreferencesElement.extend('LoginFacebookPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});