/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function definePornHostElement(PluginElement) {

  /**
   * Define PornHost Element
   * @param view
   * @param opts
   * @returns {PornHostElement}
   * @constructor
   * @class PornHostElement
   * @extends PluginElement
   */
  var PornHostElement = function PornHostElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('porn.host', {resource: '/widgets'});

    return this;
  };

  return PornHostElement.extend('PornHostElement', {

    /**
     * Render Embedded content
     * @memberOf PornHostElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
