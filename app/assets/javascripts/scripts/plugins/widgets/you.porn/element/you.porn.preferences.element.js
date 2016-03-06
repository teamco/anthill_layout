/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineYouPornPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define YouPorn Preferences Element
     * @param view
     * @param opts
     * @returns {YouPornPreferencesElement}
     * @constructor
     * @class YouPornPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var YouPornPreferencesElement = function YouPornPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return YouPornPreferencesElement.extend('YouPornPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
