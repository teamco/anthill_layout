/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineEmotionPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Emotion Preferences Element
     * @constructor
     * @class EmotionPreferencesElement
     * @param {EmotionView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {EmotionPreferencesElement}
     */
    var EmotionPreferencesElement = function EmotionPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EmotionPreferencesElement.extend(
        'EmotionPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
