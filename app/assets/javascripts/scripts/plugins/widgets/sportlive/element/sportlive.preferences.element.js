/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSportlivePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Sportlive Preferences Element
     * @constructor
     * @class SportlivePreferencesElement
     * @param {SportliveView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {SportlivePreferencesElement}
     */
    var SportlivePreferencesElement = function SportlivePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SportlivePreferencesElement.extend(
        'SportlivePreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
