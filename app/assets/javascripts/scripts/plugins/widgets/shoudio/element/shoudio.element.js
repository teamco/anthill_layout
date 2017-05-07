/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineShoudioElement(PluginElement) {

  /**
   * Define Shoudio Element
   * @param view
   * @param opts
   * @returns {ShoudioElement}
   * @constructor
   * @class ShoudioElement
   * @extends PluginElement
   */
  var ShoudioElement = function ShoudioElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('shoudio', {resource: '/widgets'});

    return this;
  };

  return ShoudioElement.extend('ShoudioElement', {

    /**
     * Render Embedded content
     * @memberOf ShoudioElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(
          this.renderIframe(
              $(embed).attr('src')
          )
      );
    }

  }, PluginElement.prototype);
});
