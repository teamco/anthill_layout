/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineEmbedlyPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Embedly Preferences Element
     * @constructor
     * @class EmbedlyPreferencesElement
     * @param {EmbedlyView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {EmbedlyPreferencesElement}
     */
    var EmbedlyPreferencesElement = function EmbedlyPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EmbedlyPreferencesElement.extend('EmbedlyPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
