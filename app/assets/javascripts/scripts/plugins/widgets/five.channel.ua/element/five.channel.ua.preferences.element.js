/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineFiveChannelUaPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define FiveChannelUa Preferences Element
     * @param view
     * @param opts
     * @returns {FiveChannelUaPreferencesElement}
     * @constructor
     * @class FiveChannelUaPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var FiveChannelUaPreferencesElement = function FiveChannelUaPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FiveChannelUaPreferencesElement.extend('FiveChannelUaPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
