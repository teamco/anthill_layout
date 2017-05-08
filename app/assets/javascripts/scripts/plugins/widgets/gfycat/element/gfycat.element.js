/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineGfycatElement(PluginElement) {

  /**
   * Define Gfycat Element
   * @param view
   * @param opts
   * @returns {GfycatElement}
   * @constructor
   * @class GfycatElement
   * @extends PluginElement
   */
  var GfycatElement = function GfycatElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('gfycat', {resource: '/widgets'});

    return this;
  };

  return GfycatElement.extend('GfycatElement', {

    /**
     * Render Embedded content
     * @memberOf GfycatElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.addContent(
          this.renderIframe(
              'https://gfycat.com/ifr/' +
              url.replace(/https:\/\/gfycat.com\//, '')
          )
      );
    }

  }, PluginElement.prototype);
});
