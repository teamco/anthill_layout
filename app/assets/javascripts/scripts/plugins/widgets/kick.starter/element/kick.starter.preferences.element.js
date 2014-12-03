/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineKickStarterPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define KickStarter Preferences Element
     * @param view
     * @param opts
     * @returns {KickStarterPreferencesElement}
     * @constructor
     * @class KickStarterPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var KickStarterPreferencesElement = function KickStarterPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return KickStarterPreferencesElement.extend('KickStarterPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
