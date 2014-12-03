/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineTwentyFourVideoPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TwentyFourVideo Preferences Element
     * @param view
     * @param opts
     * @returns {TwentyFourVideoPreferencesElement}
     * @constructor
     * @class TwentyFourVideoPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TwentyFourVideoPreferencesElement = function TwentyFourVideoPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TwentyFourVideoPreferencesElement.extend('TwentyFourVideoPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
