/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePetradarPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Petradar Preferences Element
     * @param view
     * @param opts
     * @returns {PetradarPreferencesElement}
     * @constructor
     * @class PetradarPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PetradarPreferencesElement = function PetradarPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PetradarPreferencesElement.extend('PetradarPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});