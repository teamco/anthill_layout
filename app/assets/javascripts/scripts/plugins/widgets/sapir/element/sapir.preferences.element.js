/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineSapirPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Sapir Preferences Element
     * @constructor
     * @class SapirPreferencesElement
     * @param {SapirView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {SapirPreferencesElement}
     */
    var SapirPreferencesElement = function SapirPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SapirPreferencesElement.extend(
        'SapirPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
