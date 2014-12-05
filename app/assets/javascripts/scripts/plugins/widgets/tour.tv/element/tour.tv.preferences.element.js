/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTourTvPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TourTv Preferences Element
     * @param view
     * @param opts
     * @returns {TourTvPreferencesElement}
     * @constructor
     * @class TourTvPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TourTvPreferencesElement = function TourTvPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TourTvPreferencesElement.extend('TourTvPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
