/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineSomeEcardsPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define SomeEcards Preferences Element
     * @param view
     * @param opts
     * @returns {SomeEcardsPreferencesElement}
     * @constructor
     * @class SomeEcardsPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var SomeEcardsPreferencesElement = function SomeEcardsPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SomeEcardsPreferencesElement.extend('SomeEcardsPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
