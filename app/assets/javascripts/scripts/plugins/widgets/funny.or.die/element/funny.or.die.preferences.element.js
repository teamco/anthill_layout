/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineFunnyOrDiePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define FunnyOrDie Preferences Element
     * @param view
     * @param opts
     * @returns {FunnyOrDiePreferencesElement}
     * @constructor
     * @class FunnyOrDiePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var FunnyOrDiePreferencesElement = function FunnyOrDiePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FunnyOrDiePreferencesElement.extend('FunnyOrDiePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
