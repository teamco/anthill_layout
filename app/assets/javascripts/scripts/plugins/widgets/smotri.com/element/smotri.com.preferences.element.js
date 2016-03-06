/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineSmotriComPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define SmotriCom Preferences Element
     * @param view
     * @param opts
     * @returns {SmotriComPreferencesElement}
     * @constructor
     * @class SmotriComPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var SmotriComPreferencesElement = function SmotriComPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SmotriComPreferencesElement.extend('SmotriComPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
