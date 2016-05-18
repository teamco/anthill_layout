/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineLetsPlayPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define LetsPlay Preferences Element
     * @constructor
     * @class LetsPlayPreferencesElement
     * @param {LetsPlayView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {LetsPlayPreferencesElement}
     */
    var LetsPlayPreferencesElement = function LetsPlayPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LetsPlayPreferencesElement.extend(
        'LetsPlayPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
