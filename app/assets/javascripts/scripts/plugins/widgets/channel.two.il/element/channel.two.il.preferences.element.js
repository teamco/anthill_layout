/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineChannelTwoIlPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define ChannelTwoIl Preferences Element
     * @param view
     * @param opts
     * @returns {ChannelTwoIlPreferencesElement}
     * @constructor
     * @class ChannelTwoIlPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var ChannelTwoIlPreferencesElement = function ChannelTwoIlPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ChannelTwoIlPreferencesElement.extend('ChannelTwoIlPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
