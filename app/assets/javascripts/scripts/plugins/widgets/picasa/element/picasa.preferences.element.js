/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePicasaPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Picasa Preferences Element
     * @param view
     * @param opts
     * @returns {PicasaPreferencesElement}
     * @constructor
     * @class PicasaPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PicasaPreferencesElement = function PicasaPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PicasaPreferencesElement.extend('PicasaPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
