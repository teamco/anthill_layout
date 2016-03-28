/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineBigmirNetPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define BigmirNet Preferences Element
     * @param view
     * @param opts
     * @returns {BigmirNetPreferencesElement}
     * @constructor
     * @class BigmirNetPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var BigmirNetPreferencesElement = function BigmirNetPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return BigmirNetPreferencesElement.extend(
        'BigmirNetPreferencesElement', {},
        PluginElement.prototype,
        WidgetPreferences.prototype
    );
});
