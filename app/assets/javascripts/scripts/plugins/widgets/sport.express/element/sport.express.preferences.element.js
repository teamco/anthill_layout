/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSportExpressPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define SportExpress Preferences Element
     * @param view
     * @param opts
     * @returns {SportExpressPreferencesElement}
     * @constructor
     * @class SportExpressPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var SportExpressPreferencesElement = function SportExpressPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SportExpressPreferencesElement.extend('SportExpressPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
