/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTsnUaPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define TsnUa Preferences Element
     * @param view
     * @param opts
     * @returns {TsnUaPreferencesElement}
     * @constructor
     * @class TsnUaPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var TsnUaPreferencesElement = function TsnUaPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TsnUaPreferencesElement.extend('TsnUaPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
