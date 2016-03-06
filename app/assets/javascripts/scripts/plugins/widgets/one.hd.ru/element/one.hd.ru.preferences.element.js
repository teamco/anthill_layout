/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineOneHdRuPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define OneHdRu Preferences Element
     * @param view
     * @param opts
     * @returns {OneHdRuPreferencesElement}
     * @constructor
     * @class OneHdRuPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var OneHdRuPreferencesElement = function OneHdRuPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OneHdRuPreferencesElement.extend('OneHdRuPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
