/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineDatepickerPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Datepicker Preferences Element
     * @constructor
     * @class DatepickerPreferencesElement
     * @param {DatepickerView} view
     * @param opts
     * @extends BaseElement
     * @extends WidgetPreferences
     * @returns {DatepickerPreferencesElement}
     */
    var DatepickerPreferencesElement = function DatepickerPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return DatepickerPreferencesElement.extend('DatepickerPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
