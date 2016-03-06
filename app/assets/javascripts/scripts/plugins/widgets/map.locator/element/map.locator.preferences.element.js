/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineMapLocatorPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define MapLocator Preferences Element
     * @param view
     * @param opts
     * @returns {MapLocatorPreferencesElement}
     * @constructor
     * @class MapLocatorPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var MapLocatorPreferencesElement = function MapLocatorPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return MapLocatorPreferencesElement.extend('MapLocatorPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});