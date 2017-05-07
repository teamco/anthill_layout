/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineVideochartNetElement(PluginElement) {

  /**
   * Define VideochartNet Element
   * @param view
   * @param opts
   * @returns {VideochartNetElement}
   * @constructor
   * @class VideochartNetElement
   * @extends PluginElement
   */
  var VideochartNetElement = function VideochartNetElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('videochart.net', {resource: '/widgets'});

    return this;
  };

  return VideochartNetElement.extend('VideochartNetElement', {

    /**
     * Render Embedded content
     * @memberOf VideochartNetElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {

      this.$.html(
          this.renderIframe(
              (url || '').replace(/\/video\//, '/embed/')
          )
      );
    }

  }, PluginElement.prototype);
});
