/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTubeEightPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TubeEight Preferences Element
     * @param view
     * @param opts
     * @returns {TubeEightPreferencesElement}
     * @constructor
     * @class TubeEightPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TubeEightPreferencesElement = function TubeEightPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TubeEightPreferencesElement.extend('TubeEightPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
