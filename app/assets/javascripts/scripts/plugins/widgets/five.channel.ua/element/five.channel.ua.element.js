/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineFiveChannelUaElement(PluginElement) {

  /**
   * Define FiveChannelUa Element
   * @param view
   * @param opts
   * @returns {FiveChannelUaElement}
   * @constructor
   * @class FiveChannelUaElement
   * @extends PluginElement
   */
  var FiveChannelUaElement = function FiveChannelUaElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('five.channel.ua', {resource: '/widgets'});

    return this;
  };

  return FiveChannelUaElement.extend('FiveChannelUaElement', {

    /**
     * Render Embedded content
     * @memberOf FiveChannelUaElement
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
