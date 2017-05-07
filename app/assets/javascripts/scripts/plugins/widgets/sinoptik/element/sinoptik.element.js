/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineSinoptikElement(PluginElement) {

  /**
   * Define Sinoptik Element
   * @param view
   * @param opts
   * @returns {SinoptikElement}
   * @constructor
   * @class SinoptikElement
   * @extends PluginElement
   */
  var SinoptikElement = function SinoptikElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('sinoptik', {resource: '/widgets'});

    return this;
  };

  return SinoptikElement.extend('SinoptikElement', {

    /**
     * Render Embedded content
     * @memberOf SinoptikElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(embed);
    }

  }, PluginElement.prototype);
});
