/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineCoubPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Coub Preferences Element
     * @param view
     * @param opts
     * @returns {CoubPreferencesElement}
     * @constructor
     * @class CoubPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var CoubPreferencesElement = function CoubPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return CoubPreferencesElement.extend('CoubPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
