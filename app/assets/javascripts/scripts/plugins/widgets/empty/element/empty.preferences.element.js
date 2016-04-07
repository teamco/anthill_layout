/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineEmptyPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Empty Preferences Element
     * @constructor
     * @class EmptyPreferencesElement
     * @param {EmptyView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {EmptyPreferencesElement}
     */
    var EmptyPreferencesElement = function EmptyPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EmptyPreferencesElement.extend(
        'EmptyPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});