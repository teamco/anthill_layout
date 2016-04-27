/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePasteryPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Pastery Preferences Element
     * @constructor
     * @class PasteryPreferencesElement
     * @param {PasteryView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {PasteryPreferencesElement}
     */
    var PasteryPreferencesElement = function PasteryPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PasteryPreferencesElement.extend(
        'PasteryPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
