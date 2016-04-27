/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineIftttPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Ifttt Preferences Element
     * @constructor
     * @class IftttPreferencesElement
     * @param {IftttView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {IftttPreferencesElement}
     */
    var IftttPreferencesElement = function IftttPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return IftttPreferencesElement.extend(
        'IftttPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
