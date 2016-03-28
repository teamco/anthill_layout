/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineLiveLeakPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define LiveLeak Preferences Element
     * @param view
     * @param opts
     * @returns {LiveLeakPreferencesElement}
     * @constructor
     * @class LiveLeakPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var LiveLeakPreferencesElement = function LiveLeakPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LiveLeakPreferencesElement.extend('LiveLeakPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
