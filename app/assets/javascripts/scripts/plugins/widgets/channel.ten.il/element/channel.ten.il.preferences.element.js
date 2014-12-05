/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineChannelTenIlPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define ChannelTenIl Preferences Element
     * @param view
     * @param opts
     * @returns {ChannelTenIlPreferencesElement}
     * @constructor
     * @class ChannelTenIlPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var ChannelTenIlPreferencesElement = function ChannelTenIlPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ChannelTenIlPreferencesElement.extend('ChannelTenIlPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
