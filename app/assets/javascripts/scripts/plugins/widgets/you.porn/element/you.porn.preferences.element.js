/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineYouPornPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define YouPorn Preferences Element
     * @param view
     * @param opts
     * @returns {YouPornPreferencesElement}
     * @constructor
     * @class YouPornPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var YouPornPreferencesElement = function YouPornPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return YouPornPreferencesElement.extend('YouPornPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
