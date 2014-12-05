/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineStepashkaPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Stepashka Preferences Element
     * @param view
     * @param opts
     * @returns {StepashkaPreferencesElement}
     * @constructor
     * @class StepashkaPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var StepashkaPreferencesElement = function StepashkaPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return StepashkaPreferencesElement.extend('StepashkaPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
