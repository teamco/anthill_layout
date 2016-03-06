/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTviPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Tvi Preferences Element
     * @param view
     * @param opts
     * @returns {TviPreferencesElement}
     * @constructor
     * @class TviPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TviPreferencesElement = function TviPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TviPreferencesElement.extend('TviPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
