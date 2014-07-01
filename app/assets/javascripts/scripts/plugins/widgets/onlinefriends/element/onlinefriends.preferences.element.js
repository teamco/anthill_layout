/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineOnlinefriendsPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Onlinefriends Preferences Element
     * @param view
     * @param opts
     * @returns {OnlinefriendsPreferencesElement}
     * @constructor
     * @class OnlinefriendsPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var OnlinefriendsPreferencesElement = function OnlinefriendsPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OnlinefriendsPreferencesElement.extend('OnlinefriendsPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});