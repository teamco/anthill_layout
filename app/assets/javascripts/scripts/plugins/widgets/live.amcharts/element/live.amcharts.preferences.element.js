/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineLiveAmchartsPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define LiveAmcharts Preferences Element
     * @constructor
     * @class LiveAmchartsPreferencesElement
     * @param {LiveAmchartsView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {LiveAmchartsPreferencesElement}
     */
    var LiveAmchartsPreferencesElement = function LiveAmchartsPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LiveAmchartsPreferencesElement.extend(
        'LiveAmchartsPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
