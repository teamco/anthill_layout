/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineVineCoPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define VineCo Preferences Element
     * @param view
     * @param opts
     * @returns {VineCoPreferencesElement}
     * @constructor
     * @class VineCoPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var VineCoPreferencesElement = function VineCoPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return VineCoPreferencesElement.extend('VineCoPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
