/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTnaFlixPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define TnaFlix Preferences Element
     * @param view
     * @param opts
     * @returns {TnaFlixPreferencesElement}
     * @constructor
     * @class TnaFlixPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var TnaFlixPreferencesElement = function TnaFlixPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TnaFlixPreferencesElement.extend('TnaFlixPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
