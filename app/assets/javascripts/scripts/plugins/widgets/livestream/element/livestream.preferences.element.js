/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineLivestreamPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Livestream Preferences Element
     * @param view
     * @param opts
     * @returns {LivestreamPreferencesElement}
     * @constructor
     * @class LivestreamPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var LivestreamPreferencesElement = function LivestreamPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LivestreamPreferencesElement.extend('LivestreamPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
