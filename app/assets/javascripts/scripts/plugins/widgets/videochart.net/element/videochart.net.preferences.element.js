/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineVideochartNetPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define VideochartNet Preferences Element
     * @constructor
     * @class VideochartNetPreferencesElement
     * @param {VideochartNetView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {VideochartNetPreferencesElement}
     */
    var VideochartNetPreferencesElement = function VideochartNetPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return VideochartNetPreferencesElement.extend(
        'VideochartNetPreferencesElement', {},
        PluginElement.prototype,
        WidgetPreferences.prototype
    );
});
