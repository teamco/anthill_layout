/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineFlipPdfPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define FlipPdf Preferences Element
     * @param view
     * @param opts
     * @returns {FlipPdfPreferencesElement}
     * @constructor
     * @class FlipPdfPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var FlipPdfPreferencesElement = function FlipPdfPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FlipPdfPreferencesElement.extend('FlipPdfPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
