/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineFotoKritikPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define FotoKritik Preferences Element
     * @param view
     * @param opts
     * @returns {FotoKritikPreferencesElement}
     * @constructor
     * @class FotoKritikPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var FotoKritikPreferencesElement = function FotoKritikPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FotoKritikPreferencesElement.extend('FotoKritikPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
