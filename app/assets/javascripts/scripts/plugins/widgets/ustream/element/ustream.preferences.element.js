/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineUstreamPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Ustream Preferences Element
     * @param view
     * @param opts
     * @returns {UstreamPreferencesElement}
     * @constructor
     * @class UstreamPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var UstreamPreferencesElement = function UstreamPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return UstreamPreferencesElement.extend('UstreamPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
