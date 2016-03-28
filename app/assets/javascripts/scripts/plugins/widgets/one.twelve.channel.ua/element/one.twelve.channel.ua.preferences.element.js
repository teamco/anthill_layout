/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineOneTwelveChannelUaPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define OneTwelveChannelUa Preferences Element
     * @param view
     * @param opts
     * @returns {OneTwelveChannelUaPreferencesElement}
     * @constructor
     * @class OneTwelveChannelUaPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var OneTwelveChannelUaPreferencesElement = function OneTwelveChannelUaPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OneTwelveChannelUaPreferencesElement.extend('OneTwelveChannelUaPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
