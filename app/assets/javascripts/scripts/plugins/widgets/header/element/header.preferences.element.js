/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineHeaderPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Header Preferences Element
     * @param view
     * @param opts
     * @returns {HeaderPreferencesElement}
     * @constructor
     * @class HeaderPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var HeaderPreferencesElement = function HeaderPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return HeaderPreferencesElement.extend('HeaderPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});