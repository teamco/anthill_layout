/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTitlePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Title Preferences Element
     * @constructor
     * @class TitlePreferencesElement
     * @param {TitleView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {TitlePreferencesElement}
     */
    var TitlePreferencesElement = function TitlePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TitlePreferencesElement.extend(
        'TitlePreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
