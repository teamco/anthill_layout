/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTimeToastPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TimeToast Preferences Element
     * @param view
     * @param opts
     * @returns {TimeToastPreferencesElement}
     * @constructor
     * @class TimeToastPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TimeToastPreferencesElement = function TimeToastPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TimeToastPreferencesElement.extend('TimeToastPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
