/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePreziPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Prezi Preferences Element
     * @param view
     * @param opts
     * @returns {PreziPreferencesElement}
     * @constructor
     * @class PreziPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var PreziPreferencesElement = function PreziPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PreziPreferencesElement.extend('PreziPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
