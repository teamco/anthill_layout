/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineQuicktimePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Quicktime Preferences Element
     * @param view
     * @param opts
     * @returns {QuicktimePreferencesElement}
     * @constructor
     * @class QuicktimePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var QuicktimePreferencesElement = function QuicktimePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return QuicktimePreferencesElement.extend('QuicktimePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});