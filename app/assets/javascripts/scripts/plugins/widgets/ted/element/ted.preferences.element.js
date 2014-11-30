/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTedPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Ted Preferences Element
     * @param view
     * @param opts
     * @returns {TedPreferencesElement}
     * @constructor
     * @class TedPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TedPreferencesElement = function TedPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TedPreferencesElement.extend('TedPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
