/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSublimeVideoPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define SublimeVideo Preferences Element
     * @param view
     * @param opts
     * @returns {SublimeVideoPreferencesElement}
     * @constructor
     * @class SublimeVideoPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var SublimeVideoPreferencesElement = function SublimeVideoPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SublimeVideoPreferencesElement.extend('SublimeVideoPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
