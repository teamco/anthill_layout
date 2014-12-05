/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineEmpflixPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Empflix Preferences Element
     * @param view
     * @param opts
     * @returns {EmpflixPreferencesElement}
     * @constructor
     * @class EmpflixPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var EmpflixPreferencesElement = function EmpflixPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EmpflixPreferencesElement.extend('EmpflixPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
