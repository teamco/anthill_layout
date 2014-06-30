/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePassportPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Passport Preferences Element
     * @param view
     * @param opts
     * @returns {PassportPreferencesElement}
     * @constructor
     * @class PassportPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PassportPreferencesElement = function PassportPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PassportPreferencesElement.extend('PassportPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});