/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineOdnoklassnikiPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Odnoklassniki Preferences Element
     * @constructor
     * @class OdnoklassnikiPreferencesElement
     * @param {OdnoklassnikiView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {OdnoklassnikiPreferencesElement}
     */
    var OdnoklassnikiPreferencesElement = function OdnoklassnikiPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OdnoklassnikiPreferencesElement.extend(
        'OdnoklassnikiPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
