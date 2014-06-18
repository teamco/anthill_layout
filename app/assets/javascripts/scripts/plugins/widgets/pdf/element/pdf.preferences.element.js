/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePdfPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Pdf Preferences Element
     * @param view
     * @param opts
     * @returns {PdfPreferencesElement}
     * @constructor
     * @class PdfPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PdfPreferencesElement = function PdfPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PdfPreferencesElement.extend('PdfPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});