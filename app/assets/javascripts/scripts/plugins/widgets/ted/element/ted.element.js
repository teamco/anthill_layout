/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineTedElement(PluginElement) {

  /**
   * Define Ted Element
   * @param view
   * @param opts
   * @returns {TedElement}
   * @constructor
   * @class TedElement
   * @extends PluginElement
   */
  var TedElement = function TedElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('ted', {resource: '/widgets'});

    return this;
  };

  return TedElement.extend('TedElement', {

    /**
     * Render Embedded content
     * @memberOf TedElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
