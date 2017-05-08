/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineKeezMoviesElement(PluginElement) {

  /**
   * Define KeezMovies Element
   * @param view
   * @param opts
   * @returns {KeezMoviesElement}
   * @constructor
   * @class KeezMoviesElement
   * @extends PluginElement
   */
  var KeezMoviesElement = function KeezMoviesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('keez.movies', {resource: '/widgets'});

    return this;
  };

  return KeezMoviesElement.extend('KeezMoviesElement', {

    /**
     * Render Embedded content
     * @memberOf KeezMoviesElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
