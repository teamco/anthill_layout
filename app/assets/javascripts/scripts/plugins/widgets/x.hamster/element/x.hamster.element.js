/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineXHamsterElement(PluginElement) {

  /**
   * Define XHamster Element
   * @param view
   * @param opts
   * @returns {XHamsterElement}
   * @constructor
   * @class XHamsterElement
   * @extends PluginElement
   */
  var XHamsterElement = function XHamsterElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('x.hamster', {resource: '/widgets'});

    return this;
  };

  return XHamsterElement.extend('XHamsterElement', {

    /**
     * Render Embedded content
     * @memberOf XHamsterElement
     * @param {string} iframe
     */
    renderEmbeddedContent: function renderEmbeddedContent(iframe) {
      this.$.append(iframe);
    }

  }, PluginElement.prototype);

});
