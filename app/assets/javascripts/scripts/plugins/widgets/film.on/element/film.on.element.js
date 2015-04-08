/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineFilmOnElement(BaseElement) {

    /**
     * Define FilmOn Element
     * @param view
     * @param opts
     * @returns {FilmOnElement}
     * @constructor
     * @class FilmOnElement
     * @extends BaseElement
     */
    var FilmOnElement = function FilmOnElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('film.on', {resource: '/widgets'});

        return this;
    };

    return FilmOnElement.extend('FilmOnElement', {

        /**
         * Render Embedded content
         * @memberOf FilmOnElement
         * @param {string} iframe
         */
        renderEmbeddedContent: function renderEmbeddedContent(iframe) {
            this.$.append(iframe);
        }

    }, BaseElement.prototype);

});
