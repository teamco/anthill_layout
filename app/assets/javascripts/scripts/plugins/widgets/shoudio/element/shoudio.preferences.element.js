/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineShoudioPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Shoudio Preferences Element
     * @constructor
     * @class ShoudioPreferencesElement
     * @param {ShoudioView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {ShoudioPreferencesElement}
     */
    var ShoudioPreferencesElement = function ShoudioPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ShoudioPreferencesElement.extend(
        'ShoudioPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
