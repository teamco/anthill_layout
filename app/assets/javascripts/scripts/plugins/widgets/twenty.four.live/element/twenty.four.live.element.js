/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineTwentyFourLiveElement(PluginElement) {

  /**
   * Define TwentyFourLive Element
   * @param view
   * @param opts
   * @returns {TwentyFourLiveElement}
   * @constructor
   * @class TwentyFourLiveElement
   * @extends PluginElement
   */
  var TwentyFourLiveElement = function TwentyFourLiveElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('twenty.four.live', {resource: '/widgets'});

    return this;
  };

  return TwentyFourLiveElement.extend('TwentyFourLiveElement', {

    /**
     * Render Embedded content
     * @memberOf TwentyFourLiveElement
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
