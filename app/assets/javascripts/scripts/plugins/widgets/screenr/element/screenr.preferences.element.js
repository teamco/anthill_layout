/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineScreenrPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Screenr Preferences Element
     * @param view
     * @param opts
     * @returns {ScreenrPreferencesElement}
     * @constructor
     * @class ScreenrPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var ScreenrPreferencesElement = function ScreenrPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ScreenrPreferencesElement.extend('ScreenrPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
