/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineHeaderPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Header Preferences Element
     * @param view
     * @param opts
     * @returns {HeaderPreferencesElement}
     * @constructor
     * @class HeaderPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var HeaderPreferencesElement = function HeaderPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return HeaderPreferencesElement.extend('HeaderPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});