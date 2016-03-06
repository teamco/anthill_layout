/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePornHostPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define PornHost Preferences Element
     * @param view
     * @param opts
     * @returns {PornHostPreferencesElement}
     * @constructor
     * @class PornHostPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PornHostPreferencesElement = function PornHostPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PornHostPreferencesElement.extend('PornHostPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
