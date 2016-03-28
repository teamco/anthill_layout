/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineQuicktimePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Quicktime Preferences Element
     * @param view
     * @param opts
     * @returns {QuicktimePreferencesElement}
     * @constructor
     * @class QuicktimePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var QuicktimePreferencesElement = function QuicktimePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return QuicktimePreferencesElement.extend('QuicktimePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});