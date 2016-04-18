/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSapOpenuiPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define SapOpenui Preferences Element
     * @constructor
     * @class SapOpenuiPreferencesElement
     * @param {SapOpenuiView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {SapOpenuiPreferencesElement}
     */
    var SapOpenuiPreferencesElement = function SapOpenuiPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SapOpenuiPreferencesElement.extend(
        'SapOpenuiPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
