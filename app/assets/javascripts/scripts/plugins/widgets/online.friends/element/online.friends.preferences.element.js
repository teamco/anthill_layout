/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineOnlineFriendsPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define OnlineFriends Preferences Element
     * @param view
     * @param opts
     * @returns {OnlineFriendsPreferencesElement}
     * @constructor
     * @class OnlineFriendsPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var OnlineFriendsPreferencesElement = function OnlineFriendsPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OnlineFriendsPreferencesElement.extend('OnlineFriendsPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});