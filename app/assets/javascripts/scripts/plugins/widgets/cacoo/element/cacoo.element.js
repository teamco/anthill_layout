/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineCacooElement(PluginElement) {

  /**
   * Define Cacoo Element
   * @param view
   * @param opts
   * @returns {CacooElement}
   * @constructor
   * @class CacooElement
   * @extends PluginElement
   */
  var CacooElement = function CacooElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('cacoo', {resource: '/widgets'});

    return this;
  };

  return CacooElement.extend('CacooElement', {

    /**
     * Render Embedded content
     * @memberOf CacooElement
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
