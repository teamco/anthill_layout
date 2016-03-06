/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineMetaUaPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define MetaUa Preferences Element
     * @param view
     * @param opts
     * @returns {MetaUaPreferencesElement}
     * @constructor
     * @class MetaUaPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var MetaUaPreferencesElement = function MetaUaPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return MetaUaPreferencesElement.extend('MetaUaPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
