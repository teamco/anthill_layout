/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineYoutubePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Youtube Preferences Element
     * @param view
     * @param opts
     * @returns {YoutubePreferencesElement}
     * @constructor
     * @class YoutubePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var YoutubePreferencesElement = function YoutubePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return YoutubePreferencesElement.extend('YoutubePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});