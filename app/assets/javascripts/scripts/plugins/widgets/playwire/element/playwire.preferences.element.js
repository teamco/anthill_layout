/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePlaywirePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Playwire Preferences Element
     * @constructor
     * @class PlaywirePreferencesElement
     * @param {PlaywireView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {PlaywirePreferencesElement}
     */
    var PlaywirePreferencesElement = function PlaywirePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PlaywirePreferencesElement.extend(
        'PlaywirePreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
