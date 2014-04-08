/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/preferences/widget.preferences'
], function defineEmptyPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Empty Preferences Element
     * @param view
     * @param opts
     * @returns {EmptyPreferencesElement}
     * @constructor
     * @class EmptyPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var EmptyPreferencesElement = function EmptyPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EmptyPreferencesElement.extend('EmptyPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});