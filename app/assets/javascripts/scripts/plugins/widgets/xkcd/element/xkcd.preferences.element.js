/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineXkcdPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Xkcd Preferences Element
     * @param view
     * @param opts
     * @returns {XkcdPreferencesElement}
     * @constructor
     * @class XkcdPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var XkcdPreferencesElement = function XkcdPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return XkcdPreferencesElement.extend('XkcdPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
