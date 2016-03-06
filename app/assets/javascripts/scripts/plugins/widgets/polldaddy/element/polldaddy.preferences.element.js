/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePolldaddyPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Polldaddy Preferences Element
     * @param view
     * @param opts
     * @returns {PolldaddyPreferencesElement}
     * @constructor
     * @class PolldaddyPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PolldaddyPreferencesElement = function PolldaddyPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PolldaddyPreferencesElement.extend('PolldaddyPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
