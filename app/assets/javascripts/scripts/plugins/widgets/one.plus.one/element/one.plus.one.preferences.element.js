/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineOnePlusOnePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define OnePlusOne Preferences Element
     * @param view
     * @param opts
     * @returns {OnePlusOnePreferencesElement}
     * @constructor
     * @class OnePlusOnePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var OnePlusOnePreferencesElement = function OnePlusOnePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OnePlusOnePreferencesElement.extend('OnePlusOnePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
