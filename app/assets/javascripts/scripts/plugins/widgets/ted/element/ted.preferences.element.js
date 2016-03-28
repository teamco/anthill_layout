/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTedPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Ted Preferences Element
     * @param view
     * @param opts
     * @returns {TedPreferencesElement}
     * @constructor
     * @class TedPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var TedPreferencesElement = function TedPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TedPreferencesElement.extend('TedPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
