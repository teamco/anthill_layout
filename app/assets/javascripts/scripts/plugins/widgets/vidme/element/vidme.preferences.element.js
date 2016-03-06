/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineVidmePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Vidme Preferences Element
     * @param view
     * @param opts
     * @returns {VidmePreferencesElement}
     * @constructor
     * @class VidmePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var VidmePreferencesElement = function VidmePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return VidmePreferencesElement.extend('VidmePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
