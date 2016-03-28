/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineChannelNineUaPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define ChannelNineUa Preferences Element
     * @param view
     * @param opts
     * @returns {ChannelNineUaPreferencesElement}
     * @constructor
     * @class ChannelNineUaPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var ChannelNineUaPreferencesElement = function ChannelNineUaPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ChannelNineUaPreferencesElement.extend('ChannelNineUaPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
