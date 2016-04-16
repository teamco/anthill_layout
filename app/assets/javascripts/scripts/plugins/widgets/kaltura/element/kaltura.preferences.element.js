/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineKalturaPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Kaltura Preferences Element
     * @constructor
     * @class KalturaPreferencesElement
     * @param {KalturaView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {KalturaPreferencesElement}
     */
    var KalturaPreferencesElement = function KalturaPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return KalturaPreferencesElement.extend(
        'KalturaPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
