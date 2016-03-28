/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineRssPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Rss Preferences Element
     * @param view
     * @param opts
     * @returns {RssPreferencesElement}
     * @constructor
     * @class RssPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var RssPreferencesElement = function RssPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return RssPreferencesElement.extend('RssPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});