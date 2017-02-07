/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineVideoPayNetElement(PluginElement) {

  /**
   * Define VideoPayNet Element
   * @param view
   * @param opts
   * @returns {VideoPayNetElement}
   * @constructor
   * @class VideoPayNetElement
   * @extends PluginElement
   */
  var VideoPayNetElement = function VideoPayNetElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('video.pay.net', {resource: '/widgets'});

    return this;
  };

  return VideoPayNetElement.extend('VideoPayNetElement', {

    /**
     * Render Embedded content
     * @memberOf VideoPayNetElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {

      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
