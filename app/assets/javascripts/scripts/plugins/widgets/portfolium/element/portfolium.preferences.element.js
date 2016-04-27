/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePortfoliumPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Portfolium Preferences Element
     * @constructor
     * @class PortfoliumPreferencesElement
     * @param {PortfoliumView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {PortfoliumPreferencesElement}
     */
    var PortfoliumPreferencesElement = function PortfoliumPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PortfoliumPreferencesElement.extend(
        'PortfoliumPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
