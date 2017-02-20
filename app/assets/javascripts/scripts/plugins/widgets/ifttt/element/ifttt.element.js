/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineIftttElement(PluginElement) {

  /**
   * Define Ifttt Element
   * @param view
   * @param opts
   * @returns {IftttElement}
   * @constructor
   * @class IftttElement
   * @extends PluginElement
   */
  var IftttElement = function IftttElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('ifttt', {resource: '/widgets'});

    return this;
  };

  return IftttElement.extend('IftttElement', {

    /**
     * Render Embedded content
     * @memberOf IftttElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(embed);
    }

  }, PluginElement.prototype);
});
