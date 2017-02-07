/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineXVideosElement(PluginElement) {

  /**
   * Define XVideos Element
   * @param view
   * @param opts
   * @returns {XVideosElement}
   * @constructor
   * @class XVideosElement
   * @extends PluginElement
   */
  var XVideosElement = function XVideosElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('x.videos', {resource: '/widgets'});

    return this;
  };

  return XVideosElement.extend('XVideosElement', {

    /**
     * Render Embedded content
     * @memberOf XVideosElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
