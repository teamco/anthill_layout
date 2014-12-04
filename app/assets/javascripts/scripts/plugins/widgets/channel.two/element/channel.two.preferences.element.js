/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineChannelTwoPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define ChannelTwo Preferences Element
     * @param view
     * @param opts
     * @returns {ChannelTwoPreferencesElement}
     * @constructor
     * @class ChannelTwoPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var ChannelTwoPreferencesElement = function ChannelTwoPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ChannelTwoPreferencesElement.extend('ChannelTwoPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
