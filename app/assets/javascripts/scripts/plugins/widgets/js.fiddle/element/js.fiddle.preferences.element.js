/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineJsFiddlePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define JsFiddle Preferences Element
     * @param view
     * @param opts
     * @returns {JsFiddlePreferencesElement}
     * @constructor
     * @class JsFiddlePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var JsFiddlePreferencesElement = function JsFiddlePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return JsFiddlePreferencesElement.extend('JsFiddlePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
