/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTsnUaPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TsnUa Preferences Element
     * @param view
     * @param opts
     * @returns {TsnUaPreferencesElement}
     * @constructor
     * @class TsnUaPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TsnUaPreferencesElement = function TsnUaPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TsnUaPreferencesElement.extend('TsnUaPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
