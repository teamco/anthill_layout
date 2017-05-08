/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineOraTvElement(PluginElement) {

  /**
   * Define OraTv Element
   * @param view
   * @param opts
   * @returns {OraTvElement}
   * @constructor
   * @class OraTvElement
   * @extends PluginElement
   */
  var OraTvElement = function OraTvElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('ora.tv', {resource: '/widgets'});

    return this;
  };

  return OraTvElement.extend('OraTvElement', {

    /**
     * Render Embedded content
     * @memberOf OraTvElement
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
