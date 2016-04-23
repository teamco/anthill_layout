/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineFilmRuElement(PluginElement) {

    /**
     * Define FilmRu Element
     * @param view
     * @param opts
     * @returns {FilmRuElement}
     * @constructor
     * @class FilmRuElement
     * @extends PluginElement
     */
    var FilmRuElement = function FilmRuElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('film.ru', {resource: '/widgets'});

        return this;
    };

    return FilmRuElement.extend('FilmRuElement', {

        /**
         * Render Embedded content
         * @memberOf FilmRuElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(
                this.renderIframe(
                    $(embed).attr('src')
                )
            );
        }

    }, PluginElement.prototype);
});
