/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineFilmOnPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define FilmOn Preferences Element
     * @param view
     * @param opts
     * @returns {FilmOnPreferencesElement}
     * @constructor
     * @class FilmOnPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var FilmOnPreferencesElement = function FilmOnPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return FilmOnPreferencesElement.extend('FilmOnPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});
