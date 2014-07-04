/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineIceFloePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define IceFloe Preferences Element
     * @param view
     * @param opts
     * @returns {IceFloePreferencesElement}
     * @constructor
     * @class IceFloePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var IceFloePreferencesElement = function IceFloePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return IceFloePreferencesElement.extend('IceFloePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});