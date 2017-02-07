/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineNationalFilmBoardOfCanadaElement(PluginElement) {

  /**
   * Define NationalFilmBoardOfCanada Element
   * @param view
   * @param opts
   * @returns {NationalFilmBoardOfCanadaElement}
   * @constructor
   * @class NationalFilmBoardOfCanadaElement
   * @extends PluginElement
   */
  var NationalFilmBoardOfCanadaElement = function NationalFilmBoardOfCanadaElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('national.film.board.of.canada', {resource: '/widgets'});

    return this;
  };

  return NationalFilmBoardOfCanadaElement.extend(
      'NationalFilmBoardOfCanadaElement', {

        /**
         * Render Embedded content
         * @memberOf NationalFilmBoardOfCanadaElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
          this.addContent(embed);
        }

      }, PluginElement.prototype);
});
