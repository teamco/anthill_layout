/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineRutubePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Rutube Preferences Element
     * @param view
     * @param opts
     * @returns {RutubePreferencesElement}
     * @constructor
     * @class RutubePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var RutubePreferencesElement = function RutubePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return RutubePreferencesElement.extend('RutubePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});