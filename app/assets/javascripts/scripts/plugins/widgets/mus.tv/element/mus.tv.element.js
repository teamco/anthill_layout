/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineMusTvElement(PluginElement) {

  /**
   * Define MusTv Element
   * @param view
   * @param opts
   * @returns {MusTvElement}
   * @constructor
   * @class MusTvElement
   * @extends PluginElement
   */
  var MusTvElement = function MusTvElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('mus.tv', {resource: '/widgets'});

    return this;
  };

  return MusTvElement.extend('MusTvElement', {

    /**
     * Render Embedded content
     * @memberOf MusTvElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
