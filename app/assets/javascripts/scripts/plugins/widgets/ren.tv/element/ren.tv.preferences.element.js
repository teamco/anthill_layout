/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineRenTvPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define RenTv Preferences Element
     * @constructor
     * @class RenTvPreferencesElement
     * @param {RenTvView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {RenTvPreferencesElement}
     */
    var RenTvPreferencesElement = function RenTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return RenTvPreferencesElement.extend(
        'RenTvPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
