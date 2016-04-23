/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineFilmRuPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define FilmRu Preferences Element
     * @constructor
     * @class FilmRuPreferencesElement
     * @param {FilmRuView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {FilmRuPreferencesElement}
     */
    var FilmRuPreferencesElement = function FilmRuPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FilmRuPreferencesElement.extend(
        'FilmRuPreferencesElement', {}, 
        PluginElement.prototype, 
        WidgetPreferences.prototype
    );
});
