/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineMyWorldPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define MyWorld Preferences Element
     * @param view
     * @param opts
     * @returns {MyWorldPreferencesElement}
     * @constructor
     * @class MyWorldPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var MyWorldPreferencesElement = function MyWorldPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return MyWorldPreferencesElement.extend('MyWorldPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
