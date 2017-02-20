/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineMixcloudElement(PluginElement) {

  /**
   * Define Mixcloud Element
   * @param view
   * @param opts
   * @returns {MixcloudElement}
   * @constructor
   * @class MixcloudElement
   * @extends PluginElement
   */
  var MixcloudElement = function MixcloudElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('mixcloud', {resource: '/widgets'});

    return this;
  };

  return MixcloudElement.extend('MixcloudElement', {

    /**
     * Render Embedded content
     * @memberOf MixcloudElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
