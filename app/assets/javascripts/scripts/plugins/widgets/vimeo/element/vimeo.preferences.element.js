/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineVimeoPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Vimeo Preferences Element
     * @param view
     * @param opts
     * @returns {VimeoPreferencesElement}
     * @constructor
     * @class VimeoPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var VimeoPreferencesElement = function VimeoPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return VimeoPreferencesElement.extend('VimeoPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});