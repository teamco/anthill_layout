/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSharePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Share Preferences Element
     * @param view
     * @param opts
     * @returns {SharePreferencesElement}
     * @constructor
     * @class SharePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var SharePreferencesElement = function SharePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SharePreferencesElement.extend('SharePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});