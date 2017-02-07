/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineFastpicElement(PluginElement) {

  /**
   * Define Fastpic Element
   * @param view
   * @param opts
   * @returns {FastpicElement}
   * @constructor
   * @class FastpicElement
   * @extends PluginElement
   */
  var FastpicElement = function FastpicElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('fastpic', {resource: '/widgets'});

    return this;
  };

  return FastpicElement.extend('FastpicElement', {

    /**
     * Render Embedded content
     * @memberOf FastpicElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.addContent(
          $('<img />').attr('src', url)
      );
    }

  }, PluginElement.prototype);
});
