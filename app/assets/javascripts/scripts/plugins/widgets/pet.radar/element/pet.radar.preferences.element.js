/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePetRadarPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define PetRadar Preferences Element
     * @param view
     * @param opts
     * @returns {PetRadarPreferencesElement}
     * @constructor
     * @class PetRadarPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PetRadarPreferencesElement = function PetRadarPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PetRadarPreferencesElement.extend('PetRadarPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});