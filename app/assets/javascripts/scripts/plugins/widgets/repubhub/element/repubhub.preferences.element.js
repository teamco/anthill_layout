/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineRepubhubPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Repubhub Preferences Element
     * @constructor
     * @class RepubhubPreferencesElement
     * @param {RepubhubView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {RepubhubPreferencesElement}
     */
    var RepubhubPreferencesElement = function RepubhubPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return RepubhubPreferencesElement.extend(
        'RepubhubPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
