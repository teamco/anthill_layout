/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineYapFilesPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define YapFiles Preferences Element
     * @param view
     * @param opts
     * @returns {YapFilesPreferencesElement}
     * @constructor
     * @class YapFilesPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var YapFilesPreferencesElement = function YapFilesPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return YapFilesPreferencesElement.extend('YapFilesPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
