/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTinyPicPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define TinyPic Preferences Element
     * @param view
     * @param opts
     * @returns {TinyPicPreferencesElement}
     * @constructor
     * @class TinyPicPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var TinyPicPreferencesElement = function TinyPicPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TinyPicPreferencesElement.extend('TinyPicPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
