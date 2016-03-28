/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineClocklinkPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Clocklink Preferences Element
     * @constructor
     * @class ClocklinkPreferencesElement
     * @param {ClocklinkView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {ClocklinkPreferencesElement}
     */
    var ClocklinkPreferencesElement = function ClocklinkPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ClocklinkPreferencesElement.extend('ClocklinkPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
