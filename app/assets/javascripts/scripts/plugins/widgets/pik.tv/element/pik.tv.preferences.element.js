/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePikTvPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define PikTv Preferences Element
     * @param view
     * @param opts
     * @returns {PikTvPreferencesElement}
     * @constructor
     * @class PikTvPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var PikTvPreferencesElement = function PikTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PikTvPreferencesElement.extend('PikTvPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
