/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineHuffdufferPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Huffduffer Preferences Element
     * @constructor
     * @class HuffdufferPreferencesElement
     * @param {HuffdufferView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {HuffdufferPreferencesElement}
     */
    var HuffdufferPreferencesElement = function HuffdufferPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return HuffdufferPreferencesElement.extend(
        'HuffdufferPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
