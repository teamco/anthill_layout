/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineProchanPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Prochan Preferences Element
     * @constructor
     * @class ProchanPreferencesElement
     * @param {ProchanView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {ProchanPreferencesElement}
     */
    var ProchanPreferencesElement = function ProchanPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ProchanPreferencesElement.extend(
        'ProchanPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
