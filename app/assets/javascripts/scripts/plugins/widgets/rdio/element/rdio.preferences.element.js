/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineRdioPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Rdio Preferences Element
     * @param view
     * @param opts
     * @returns {RdioPreferencesElement}
     * @constructor
     * @class RdioPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var RdioPreferencesElement = function RdioPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return RdioPreferencesElement.extend('RdioPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
