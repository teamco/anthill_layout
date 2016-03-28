/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineFirePicPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define FirePic Preferences Element
     * @param view
     * @param opts
     * @returns {FirePicPreferencesElement}
     * @constructor
     * @class FirePicPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var FirePicPreferencesElement = function FirePicPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FirePicPreferencesElement.extend('FirePicPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
