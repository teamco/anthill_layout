/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineBlipTvElement(PluginElement) {

  /**
   * Define BlipTv Element
   * @param view
   * @param opts
   * @returns {BlipTvElement}
   * @constructor
   * @class BlipTvElement
   * @extends PluginElement
   */
  var BlipTvElement = function BlipTvElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('blip.tv', {resource: '/widgets'});

    return this;
  };

  return BlipTvElement.extend('BlipTvElement', {

    /**
     * Render Embedded content
     * @memberOf BlipTvElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
