/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineFapaTvPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define FapaTv Preferences Element
     * @param view
     * @param opts
     * @returns {FapaTvPreferencesElement}
     * @constructor
     * @class FapaTvPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var FapaTvPreferencesElement = function FapaTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FapaTvPreferencesElement.extend('FapaTvPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
