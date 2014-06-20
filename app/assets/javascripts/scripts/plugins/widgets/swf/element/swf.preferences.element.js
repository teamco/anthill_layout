/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineSwfPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Swf Preferences Element
     * @param view
     * @param opts
     * @returns {SwfPreferencesElement}
     * @constructor
     * @class SwfPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var SwfPreferencesElement = function SwfPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SwfPreferencesElement.extend('SwfPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});