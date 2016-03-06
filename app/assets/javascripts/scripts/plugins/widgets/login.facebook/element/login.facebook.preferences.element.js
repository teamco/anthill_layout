/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineLoginFacebookPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define LoginFacebook Preferences Element
     * @param view
     * @param opts
     * @returns {LoginFacebookPreferencesElement}
     * @constructor
     * @class LoginFacebookPreferencesElement
     * @extends BaseElement
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


    }, BaseElement.prototype, WidgetPreferences.prototype);

});