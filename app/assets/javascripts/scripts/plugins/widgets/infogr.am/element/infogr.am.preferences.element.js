/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineInfogrAmPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define InfogrAm Preferences Element
     * @constructor
     * @class InfogrAmPreferencesElement
     * @param {InfogrAmView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {InfogrAmPreferencesElement}
     */
    var InfogrAmPreferencesElement = function InfogrAmPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return InfogrAmPreferencesElement.extend(
        'InfogrAmPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
