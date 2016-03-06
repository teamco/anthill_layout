/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineGooglePlusPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define GooglePlus Preferences Element
     * @param view
     * @param opts
     * @returns {GooglePlusPreferencesElement}
     * @constructor
     * @class GooglePlusPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var GooglePlusPreferencesElement = function GooglePlusPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return GooglePlusPreferencesElement.extend('GooglePlusPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
