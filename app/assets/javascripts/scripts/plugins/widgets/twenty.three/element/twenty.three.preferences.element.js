/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTwentyThreePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define TwentyThree Preferences Element
     * @param view
     * @param opts
     * @returns {TwentyThreePreferencesElement}
     * @constructor
     * @class TwentyThreePreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var TwentyThreePreferencesElement = function TwentyThreePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TwentyThreePreferencesElement.extend('TwentyThreePreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
