/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineCodepointsPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Codepoints Preferences Element
     * @constructor
     * @class CodepointsPreferencesElement
     * @param {CodepointsView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {CodepointsPreferencesElement}
     */
    var CodepointsPreferencesElement = function CodepointsPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return CodepointsPreferencesElement.extend(
        'CodepointsPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
