/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTimeToastPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define TimeToast Preferences Element
     * @param view
     * @param opts
     * @returns {TimeToastPreferencesElement}
     * @constructor
     * @class TimeToastPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var TimeToastPreferencesElement = function TimeToastPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TimeToastPreferencesElement.extend('TimeToastPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
