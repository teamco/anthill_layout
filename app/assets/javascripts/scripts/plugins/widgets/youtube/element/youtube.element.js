/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineYoutubeElement(PluginElement) {

  /**
   * Define Youtube Element
   * @param view
   * @param opts
   * @returns {YoutubeElement}
   * @constructor
   * @class YoutubeElement
   * @extends PluginElement
   */
  var YoutubeElement = function YoutubeElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('youtube', {resource: '/widgets'});

    return this;
  };

  return YoutubeElement.extend('YoutubeElement', {

    /**
     * Render Embedded content
     * @memberOf YoutubeElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url, {
            id: "ytplayer",
            type: "text/html"
          })
      );
    }

  }, PluginElement.prototype);

});