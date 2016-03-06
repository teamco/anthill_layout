/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineLoginPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Login Preferences Element
     * @param view
     * @param opts
     * @returns {LoginPreferencesElement}
     * @constructor
     * @class LoginPreferencesElement
     * @extends BaseElement
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


    }, BaseElement.prototype, WidgetPreferences.prototype);

});