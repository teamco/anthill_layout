/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineInstagramPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Instagram Preferences Element
     * @param view
     * @param opts
     * @returns {InstagramPreferencesElement}
     * @constructor
     * @class InstagramPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var InstagramPreferencesElement = function InstagramPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return InstagramPreferencesElement.extend('InstagramPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
