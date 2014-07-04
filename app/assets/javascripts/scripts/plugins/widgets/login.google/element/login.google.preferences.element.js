/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineLoginGooglePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define LoginGoogle Preferences Element
     * @param view
     * @param opts
     * @returns {LoginGooglePreferencesElement}
     * @constructor
     * @class LoginGooglePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var LoginGooglePreferencesElement = function LoginGooglePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LoginGooglePreferencesElement.extend('LoginGooglePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});