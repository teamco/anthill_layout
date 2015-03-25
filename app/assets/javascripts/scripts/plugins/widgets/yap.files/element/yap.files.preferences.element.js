/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineYapFilesPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define YapFiles Preferences Element
     * @param view
     * @param opts
     * @returns {YapFilesPreferencesElement}
     * @constructor
     * @class YapFilesPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var YapFilesPreferencesElement = function YapFilesPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return YapFilesPreferencesElement.extend('YapFilesPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
