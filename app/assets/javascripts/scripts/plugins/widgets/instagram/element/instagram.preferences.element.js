/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineInstagramPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Instagram Preferences Element
     * @param view
     * @param opts
     * @returns {InstagramPreferencesElement}
     * @constructor
     * @class InstagramPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var InstagramPreferencesElement = function InstagramPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return InstagramPreferencesElement.extend('InstagramPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
