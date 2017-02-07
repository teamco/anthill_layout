/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function definePreziElement(PluginElement) {

  /**
   * Define Prezi Element
   * @param view
   * @param opts
   * @returns {PreziElement}
   * @constructor
   * @class PreziElement
   * @extends PluginElement
   */
  var PreziElement = function PreziElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('prezi', {resource: '/widgets'});

    return this;
  };

  return PreziElement.extend('PreziElement', {

    /**
     * Render Embedded content
     * @memberOf PreziElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
