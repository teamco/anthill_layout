/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineOnlineFriendsPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define OnlineFriends Preferences Element
     * @param view
     * @param opts
     * @returns {OnlineFriendsPreferencesElement}
     * @constructor
     * @class OnlineFriendsPreferencesElement
     * @extends BaseElement
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


    }, BaseElement.prototype, WidgetPreferences.prototype);

});