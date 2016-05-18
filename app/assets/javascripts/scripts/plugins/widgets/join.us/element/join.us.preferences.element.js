/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineJoinUsPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define JoinUs Preferences Element
     * @constructor
     * @class JoinUsPreferencesElement
     * @param {JoinUsView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {JoinUsPreferencesElement}
     */
    var JoinUsPreferencesElement = function JoinUsPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return JoinUsPreferencesElement.extend(
        'JoinUsPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
