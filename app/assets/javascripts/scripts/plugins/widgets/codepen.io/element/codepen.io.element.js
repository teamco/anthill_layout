/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineCodepenIoElement(PluginElement) {

  /**
   * Define CodepenIo Element
   * @param view
   * @param opts
   * @returns {CodepenIoElement}
   * @constructor
   * @class CodepenIoElement
   * @extends PluginElement
   */
  var CodepenIoElement = function CodepenIoElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('codepen.io', {resource: '/widgets'});

    return this;
  };

  return CodepenIoElement.extend('CodepenIoElement', {

    /**
     * Render Embedded content
     * @memberOf CodepenIoElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.$.append(embed);
    }

  }, PluginElement.prototype);
});
