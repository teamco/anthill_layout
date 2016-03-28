/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineLifestreamPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Lifestream Preferences Element
     * @param view
     * @param opts
     * @returns {LifestreamPreferencesElement}
     * @constructor
     * @class LifestreamPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var LifestreamPreferencesElement = function LifestreamPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LifestreamPreferencesElement.extend('LifestreamPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
