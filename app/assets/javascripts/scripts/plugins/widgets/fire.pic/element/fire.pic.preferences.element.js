/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineFirePicPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define FirePic Preferences Element
     * @param view
     * @param opts
     * @returns {FirePicPreferencesElement}
     * @constructor
     * @class FirePicPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var FirePicPreferencesElement = function FirePicPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FirePicPreferencesElement.extend('FirePicPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
