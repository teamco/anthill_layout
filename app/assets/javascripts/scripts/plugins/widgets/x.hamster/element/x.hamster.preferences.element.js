/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineXHamsterPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define XHamster Preferences Element
     * @param view
     * @param opts
     * @returns {XHamsterPreferencesElement}
     * @constructor
     * @class XHamsterPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var XHamsterPreferencesElement = function XHamsterPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return XHamsterPreferencesElement.extend('XHamsterPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
