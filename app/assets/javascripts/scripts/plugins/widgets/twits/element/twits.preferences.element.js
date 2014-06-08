/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTwitsPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Twits Preferences Element
     * @param view
     * @param opts
     * @returns {TwitsPreferencesElement}
     * @constructor
     * @class TwitsPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TwitsPreferencesElement = function TwitsPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TwitsPreferencesElement.extend('TwitsPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});