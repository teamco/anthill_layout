/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineWistiaElement(PluginElement) {

  /**
   * Define Wistia Element
   * @param view
   * @param opts
   * @returns {WistiaElement}
   * @constructor
   * @class WistiaElement
   * @extends PluginElement
   */
  var WistiaElement = function WistiaElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('wistia', {resource: '/widgets'});

    return this;
  };

  return WistiaElement.extend('WistiaElement', {

    /**
     * Render Embedded content
     * @memberOf WistiaElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(
          this.renderIframe(
              $(embed).find('iframe').attr('src')
          )
      );
    }

  }, PluginElement.prototype);
});
