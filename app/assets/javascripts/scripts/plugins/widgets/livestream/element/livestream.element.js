/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineLivestreamElement(PluginElement) {

  /**
   * Define Livestream Element
   * @param view
   * @param opts
   * @returns {LivestreamElement}
   * @constructor
   * @class LivestreamElement
   * @extends PluginElement
   */
  var LivestreamElement = function LivestreamElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('livestream', {resource: '/widgets'});

    return this;
  };

  return LivestreamElement.extend('LivestreamElement', {

    /**
     * Render Embedded content
     * @memberOf LivestreamElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
