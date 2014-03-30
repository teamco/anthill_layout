/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/preferences/widget.preferences'
], function defineStatisticsPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Statistics Preferences Element
     * @param view
     * @param opts
     * @returns {StatisticsPreferencesElement}
     * @constructor
     * @class StatisticsPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var StatisticsPreferencesElement = function StatisticsPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts.data);

        return this;
    };

    return StatisticsPreferencesElement.extend('StatisticsPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});