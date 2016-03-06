/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineMyWorldPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define MyWorld Preferences Element
     * @param view
     * @param opts
     * @returns {MyWorldPreferencesElement}
     * @constructor
     * @class MyWorldPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var MyWorldPreferencesElement = function MyWorldPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return MyWorldPreferencesElement.extend('MyWorldPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
