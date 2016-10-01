/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSportboxRuPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define SportboxRu Preferences Element
     * @constructor
     * @class SportboxRuPreferencesElement
     * @param {SportboxRuView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {SportboxRuPreferencesElement}
     */
    var SportboxRuPreferencesElement = function SportboxRuPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SportboxRuPreferencesElement.extend(
        'SportboxRuPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
