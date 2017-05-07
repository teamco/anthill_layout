/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineFreshTvElement(PluginElement) {

  /**
   * Define FreshTv Element
   * @param view
   * @param opts
   * @returns {FreshTvElement}
   * @constructor
   * @class FreshTvElement
   * @extends PluginElement
   */
  var FreshTvElement = function FreshTvElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('fresh.tv', {resource: '/widgets'});

    return this;
  };

  return FreshTvElement.extend('FreshTvElement', {

    /**
     * Render Embedded content
     * @memberOf FreshTvElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.$.append(
          this.renderObject(
              embed.toHtml()
          )
      );
    }

  }, PluginElement.prototype);

});
