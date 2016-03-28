/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineVimeoPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Vimeo Preferences Element
     * @param view
     * @param opts
     * @returns {VimeoPreferencesElement}
     * @constructor
     * @class VimeoPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var VimeoPreferencesElement = function VimeoPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return VimeoPreferencesElement.extend('VimeoPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});