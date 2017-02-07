/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineReverbnationElement(PluginElement) {

  /**
   * Define Reverbnation Element
   * @param view
   * @param opts
   * @returns {ReverbnationElement}
   * @constructor
   * @class ReverbnationElement
   * @extends PluginElement
   */
  var ReverbnationElement = function ReverbnationElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('reverbnation', {resource: '/widgets'});

    return this;
  };

  return ReverbnationElement.extend('ReverbnationElement', {

    /**
     * Render Embedded content
     * @memberOf ReverbnationElement
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
