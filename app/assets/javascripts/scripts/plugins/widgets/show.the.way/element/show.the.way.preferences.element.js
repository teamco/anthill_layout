/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineShowTheWayPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define ShowTheWay Preferences Element
     * @constructor
     * @class ShowTheWayPreferencesElement
     * @param {ShowTheWayView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {ShowTheWayPreferencesElement}
     */
    var ShowTheWayPreferencesElement = function ShowTheWayPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ShowTheWayPreferencesElement.extend(
        'ShowTheWayPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
