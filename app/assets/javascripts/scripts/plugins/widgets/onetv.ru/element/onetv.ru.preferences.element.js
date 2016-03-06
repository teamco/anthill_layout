/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineOnetvRuPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define OnetvRu Preferences Element
     * @param view
     * @param opts
     * @returns {OnetvRuPreferencesElement}
     * @constructor
     * @class OnetvRuPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var OnetvRuPreferencesElement = function OnetvRuPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OnetvRuPreferencesElement.extend('OnetvRuPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
