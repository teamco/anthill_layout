/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineSportExpressPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define SportExpress Preferences Element
     * @param view
     * @param opts
     * @returns {SportExpressPreferencesElement}
     * @constructor
     * @class SportExpressPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var SportExpressPreferencesElement = function SportExpressPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SportExpressPreferencesElement.extend('SportExpressPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
