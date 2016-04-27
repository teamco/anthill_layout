/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineVideopressPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Videopress Preferences Element
     * @constructor
     * @class VideopressPreferencesElement
     * @param {VideopressView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {VideopressPreferencesElement}
     */
    var VideopressPreferencesElement = function VideopressPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return VideopressPreferencesElement.extend(
        'VideopressPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
