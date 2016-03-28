/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineScreencastPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Screencast Preferences Element
     * @param view
     * @param opts
     * @returns {ScreencastPreferencesElement}
     * @constructor
     * @class ScreencastPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var ScreencastPreferencesElement = function ScreencastPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ScreencastPreferencesElement.extend('ScreencastPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
