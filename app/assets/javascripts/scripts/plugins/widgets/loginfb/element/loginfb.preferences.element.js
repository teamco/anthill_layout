/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineLoginfbPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Loginfb Preferences Element
     * @param view
     * @param opts
     * @returns {LoginfbPreferencesElement}
     * @constructor
     * @class LoginfbPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var LoginfbPreferencesElement = function LoginfbPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LoginfbPreferencesElement.extend('LoginfbPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});