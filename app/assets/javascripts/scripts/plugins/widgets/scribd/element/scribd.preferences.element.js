/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineScribdPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Scribd Preferences Element
     * @param view
     * @param opts
     * @returns {ScribdPreferencesElement}
     * @constructor
     * @class ScribdPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var ScribdPreferencesElement = function ScribdPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ScribdPreferencesElement.extend('ScribdPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
