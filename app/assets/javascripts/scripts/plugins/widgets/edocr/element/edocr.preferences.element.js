/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineEdocrPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Edocr Preferences Element
     * @constructor
     * @class EdocrPreferencesElement
     * @param {EdocrView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {EdocrPreferencesElement}
     */
    var EdocrPreferencesElement = function EdocrPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EdocrPreferencesElement.extend(
        'EdocrPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
