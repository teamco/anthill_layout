/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePaypalButtonPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define PaypalButton Preferences Element
     * @constructor
     * @class PaypalButtonPreferencesElement
     * @param {PaypalButtonView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {PaypalButtonPreferencesElement}
     */
    var PaypalButtonPreferencesElement = function PaypalButtonPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PaypalButtonPreferencesElement.extend(
        'PaypalButtonPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
