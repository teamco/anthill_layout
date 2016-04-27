/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineDocsComPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define DocsCom Preferences Element
     * @constructor
     * @class DocsComPreferencesElement
     * @param {DocsComView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {DocsComPreferencesElement}
     */
    var DocsComPreferencesElement = function DocsComPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return DocsComPreferencesElement.extend(
        'DocsComPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
