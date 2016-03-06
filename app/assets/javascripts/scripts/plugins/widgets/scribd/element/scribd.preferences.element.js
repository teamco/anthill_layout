/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineScribdPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Scribd Preferences Element
     * @param view
     * @param opts
     * @returns {ScribdPreferencesElement}
     * @constructor
     * @class ScribdPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var ScribdPreferencesElement = function ScribdPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ScribdPreferencesElement.extend('ScribdPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
