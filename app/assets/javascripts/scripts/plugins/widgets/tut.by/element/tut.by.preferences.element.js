/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineTutByPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define TutBy Preferences Element
     * @constructor
     * @class TutByPreferencesElement
     * @param {TutByView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {TutByPreferencesElement}
     */
    var TutByPreferencesElement = function TutByPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return TutByPreferencesElement.extend(
        'TutByPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
