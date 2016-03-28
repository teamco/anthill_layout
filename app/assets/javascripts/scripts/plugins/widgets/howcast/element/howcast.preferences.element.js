/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineHowcastPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Howcast Preferences Element
     * @param view
     * @param opts
     * @returns {HowcastPreferencesElement}
     * @constructor
     * @class HowcastPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var HowcastPreferencesElement = function HowcastPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return HowcastPreferencesElement.extend('HowcastPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
