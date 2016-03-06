/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineIsnarePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Isnare Preferences Element
     * @param view
     * @param opts
     * @returns {IsnarePreferencesElement}
     * @constructor
     * @class IsnarePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var IsnarePreferencesElement = function IsnarePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return IsnarePreferencesElement.extend('IsnarePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
