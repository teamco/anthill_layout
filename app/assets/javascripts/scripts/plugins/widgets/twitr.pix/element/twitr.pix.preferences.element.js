/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTwitrPixPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TwitrPix Preferences Element
     * @param view
     * @param opts
     * @returns {TwitrPixPreferencesElement}
     * @constructor
     * @class TwitrPixPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TwitrPixPreferencesElement = function TwitrPixPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TwitrPixPreferencesElement.extend('TwitrPixPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
