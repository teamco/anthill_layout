/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSpankwirePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Spankwire Preferences Element
     * @param view
     * @param opts
     * @returns {SpankwirePreferencesElement}
     * @constructor
     * @class SpankwirePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var SpankwirePreferencesElement = function SpankwirePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SpankwirePreferencesElement.extend('SpankwirePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
