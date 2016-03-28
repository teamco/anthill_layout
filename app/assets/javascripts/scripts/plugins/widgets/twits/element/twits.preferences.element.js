/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTwitsPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Twits Preferences Element
     * @param view
     * @param opts
     * @returns {TwitsPreferencesElement}
     * @constructor
     * @class TwitsPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var TwitsPreferencesElement = function TwitsPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TwitsPreferencesElement.extend('TwitsPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});