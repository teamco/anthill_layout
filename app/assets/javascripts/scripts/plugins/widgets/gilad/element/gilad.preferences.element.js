/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineGiladPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Gilad Preferences Element
     * @constructor
     * @class GiladPreferencesElement
     * @param {GiladView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {GiladPreferencesElement}
     */
    var GiladPreferencesElement = function GiladPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return GiladPreferencesElement.extend(
        'GiladPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
