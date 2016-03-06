/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineFilmOnPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define FilmOn Preferences Element
     * @param view
     * @param opts
     * @returns {FilmOnPreferencesElement}
     * @constructor
     * @class FilmOnPreferencesElement
     * @extends BaseElement
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


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
