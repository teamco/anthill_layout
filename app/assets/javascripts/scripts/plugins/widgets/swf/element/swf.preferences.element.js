/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSwfPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Swf Preferences Element
     * @param view
     * @param opts
     * @returns {SwfPreferencesElement}
     * @constructor
     * @class SwfPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var SwfPreferencesElement = function SwfPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SwfPreferencesElement.extend('SwfPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});