/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineCodepointsElement(PluginElement) {

  /**
   * Define Codepoints Element
   * @param view
   * @param opts
   * @returns {CodepointsElement}
   * @constructor
   * @class CodepointsElement
   * @extends PluginElement
   */
  var CodepointsElement = function CodepointsElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('codepoints', {resource: '/widgets'});

    return this;
  };

  return CodepointsElement.extend('CodepointsElement', {

    /**
     * Render Embedded content
     * @memberOf CodepointsElement
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
