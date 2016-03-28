/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineAOneHipHopPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define AOneHipHop Preferences Element
     * @param view
     * @param opts
     * @returns {AOneHipHopPreferencesElement}
     * @constructor
     * @class AOneHipHopPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var AOneHipHopPreferencesElement = function AOneHipHopPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return AOneHipHopPreferencesElement.extend(
        'AOneHipHopPreferencesElement', {},
        PluginElement.prototype,
        WidgetPreferences.prototype
    );
});
