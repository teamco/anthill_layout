/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineCoubPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Coub Preferences Element
     * @param view
     * @param opts
     * @returns {CoubPreferencesElement}
     * @constructor
     * @class CoubPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var CoubPreferencesElement = function CoubPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return CoubPreferencesElement.extend('CoubPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
