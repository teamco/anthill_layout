/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineOneTwelveChannelUaPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define OneTwelveChannelUa Preferences Element
     * @param view
     * @param opts
     * @returns {OneTwelveChannelUaPreferencesElement}
     * @constructor
     * @class OneTwelveChannelUaPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var OneTwelveChannelUaPreferencesElement = function OneTwelveChannelUaPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OneTwelveChannelUaPreferencesElement.extend('OneTwelveChannelUaPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
