/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineBigmirNetPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define BigmirNet Preferences Element
     * @param view
     * @param opts
     * @returns {BigmirNetPreferencesElement}
     * @constructor
     * @class BigmirNetPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var BigmirNetPreferencesElement = function BigmirNetPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return BigmirNetPreferencesElement.extend('BigmirNetPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
