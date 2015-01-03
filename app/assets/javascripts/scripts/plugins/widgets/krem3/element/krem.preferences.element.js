/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineKremPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Krem Preferences Element
     * @param view
     * @param opts
     * @returns {KremPreferencesElement}
     * @constructor
     * @class KremPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var KremPreferencesElement = function KremPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return KremPreferencesElement.extend('KremPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
