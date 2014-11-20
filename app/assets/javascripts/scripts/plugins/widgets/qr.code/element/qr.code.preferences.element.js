/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineQrCodePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define QrCode Preferences Element
     * @param view
     * @param opts
     * @returns {QrCodePreferencesElement}
     * @constructor
     * @class QrCodePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var QrCodePreferencesElement = function QrCodePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return QrCodePreferencesElement.extend('QrCodePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
