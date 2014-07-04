/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePetPassportPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define PetPassport Preferences Element
     * @param view
     * @param opts
     * @returns {PetPassportPreferencesElement}
     * @constructor
     * @class PetPassportPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PetPassportPreferencesElement = function PetPassportPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PetPassportPreferencesElement.extend('PetPassportPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});