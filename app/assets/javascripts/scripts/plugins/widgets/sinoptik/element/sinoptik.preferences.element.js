/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSinoptikPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Sinoptik Preferences Element
     * @constructor
     * @class SinoptikPreferencesElement
     * @param {SinoptikView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {SinoptikPreferencesElement}
     */
    var SinoptikPreferencesElement = function SinoptikPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SinoptikPreferencesElement.extend(
        'SinoptikPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
