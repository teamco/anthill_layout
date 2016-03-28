/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePixivPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Pixiv Preferences Element
     * @param view
     * @param opts
     * @returns {PixivPreferencesElement}
     * @constructor
     * @class PixivPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var PixivPreferencesElement = function PixivPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PixivPreferencesElement.extend('PixivPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
