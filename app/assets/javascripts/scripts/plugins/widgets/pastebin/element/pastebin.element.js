/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function definePastebinElement(PluginElement) {

  /**
   * Define Pastebin Element
   * @param view
   * @param opts
   * @returns {PastebinElement}
   * @constructor
   * @class PastebinElement
   * @extends PluginElement
   */
  var PastebinElement = function PastebinElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('pastebin', {resource: '/widgets'});

    return this;
  };

  return PastebinElement.extend('PastebinElement', {

    /**
     * Render Embedded content
     * @memberOf PastebinElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
