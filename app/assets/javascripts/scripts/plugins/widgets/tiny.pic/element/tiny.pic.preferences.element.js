/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTinyPicPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TinyPic Preferences Element
     * @param view
     * @param opts
     * @returns {TinyPicPreferencesElement}
     * @constructor
     * @class TinyPicPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TinyPicPreferencesElement = function TinyPicPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TinyPicPreferencesElement.extend('TinyPicPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
