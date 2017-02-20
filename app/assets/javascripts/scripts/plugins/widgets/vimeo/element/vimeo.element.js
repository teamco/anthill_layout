/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineVimeoElement(PluginElement) {

  /**
   * Define Vimeo Element
   * @param view
   * @param opts
   * @returns {VimeoElement}
   * @constructor
   * @class VimeoElement
   * @extends PluginElement
   */
  var VimeoElement = function VimeoElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('vimeo', {resource: '/widgets'});

    return this;
  };

  return VimeoElement.extend('VimeoElement', {

    /**
     * Render Embedded content
     * @memberOf VimeoElement
     * @param {string} iframe
     */
    renderEmbeddedContent: function renderEmbeddedContent(iframe) {
      this.$.append(iframe);
    }

  }, PluginElement.prototype);

});