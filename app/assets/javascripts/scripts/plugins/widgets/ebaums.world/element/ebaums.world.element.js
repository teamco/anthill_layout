/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineEbaumsWorldElement(PluginElement) {

  /**
   * Define EbaumsWorld Element
   * @param view
   * @param opts
   * @returns {EbaumsWorldElement}
   * @constructor
   * @class EbaumsWorldElement
   * @extends PluginElement
   */
  var EbaumsWorldElement = function EbaumsWorldElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('ebaums.world', {resource: '/widgets'});

    return this;
  };

  return EbaumsWorldElement.extend('EbaumsWorldElement', {

    /**
     * Render Embedded content
     * @memberOf EbaumsWorldElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(
          this.renderIframe(
              $(embed).attr('src')
          )
      );
    }

  }, PluginElement.prototype);
});
