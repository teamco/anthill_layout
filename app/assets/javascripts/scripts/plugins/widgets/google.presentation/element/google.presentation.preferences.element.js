/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineGooglePresentationPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define GooglePresentation Preferences Element
     * @param view
     * @param opts
     * @returns {GooglePresentationPreferencesElement}
     * @constructor
     * @class GooglePresentationPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var GooglePresentationPreferencesElement = function GooglePresentationPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return GooglePresentationPreferencesElement.extend('GooglePresentationPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
