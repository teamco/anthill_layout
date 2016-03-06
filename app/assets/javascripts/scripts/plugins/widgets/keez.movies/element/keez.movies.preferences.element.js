/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineKeezMoviesPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define KeezMovies Preferences Element
     * @param view
     * @param opts
     * @returns {KeezMoviesPreferencesElement}
     * @constructor
     * @class KeezMoviesPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var KeezMoviesPreferencesElement = function KeezMoviesPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return KeezMoviesPreferencesElement.extend('KeezMoviesPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
