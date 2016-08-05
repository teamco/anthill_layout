/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function definePizapPhotoEditorPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define PizapPhotoEditor Preferences Element
     * @constructor
     * @class PizapPhotoEditorPreferencesElement
     * @param {PizapPhotoEditorView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {PizapPhotoEditorPreferencesElement}
     */
    var PizapPhotoEditorPreferencesElement = function PizapPhotoEditorPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PizapPhotoEditorPreferencesElement.extend(
        'PizapPhotoEditorPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
