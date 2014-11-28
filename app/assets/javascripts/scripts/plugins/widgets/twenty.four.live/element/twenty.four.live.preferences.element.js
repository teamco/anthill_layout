/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTwentyFourLivePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TwentyFourLive Preferences Element
     * @param view
     * @param opts
     * @returns {TwentyFourLivePreferencesElement}
     * @constructor
     * @class TwentyFourLivePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TwentyFourLivePreferencesElement = function TwentyFourLivePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TwentyFourLivePreferencesElement.extend('TwentyFourLivePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
