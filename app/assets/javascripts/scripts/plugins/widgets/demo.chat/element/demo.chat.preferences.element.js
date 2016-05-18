/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineDemoChatPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define DemoChat Preferences Element
     * @constructor
     * @class DemoChatPreferencesElement
     * @param {DemoChatView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {DemoChatPreferencesElement}
     */
    var DemoChatPreferencesElement = function DemoChatPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return DemoChatPreferencesElement.extend(
        'DemoChatPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
