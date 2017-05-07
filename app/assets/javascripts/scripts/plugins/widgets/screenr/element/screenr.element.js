/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineScreenrElement(PluginElement) {

  /**
   * Define Screenr Element
   * @param view
   * @param opts
   * @returns {ScreenrElement}
   * @constructor
   * @class ScreenrElement
   * @extends PluginElement
   */
  var ScreenrElement = function ScreenrElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('screenr', {resource: '/widgets'});

    return this;
  };

  return ScreenrElement.extend('ScreenrElement', {

    /**
     * Render Embedded content
     * @memberOf ScreenrElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
