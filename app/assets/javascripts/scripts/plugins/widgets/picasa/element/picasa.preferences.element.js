/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePicasaPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Picasa Preferences Element
     * @param view
     * @param opts
     * @returns {PicasaPreferencesElement}
     * @constructor
     * @class PicasaPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var PicasaPreferencesElement = function PicasaPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PicasaPreferencesElement.extend('PicasaPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
