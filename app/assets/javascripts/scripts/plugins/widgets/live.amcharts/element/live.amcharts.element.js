/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineLiveAmchartsElement(PluginElement) {

  /**
   * Define LiveAmcharts Element
   * @param view
   * @param opts
   * @returns {LiveAmchartsElement}
   * @constructor
   * @class LiveAmchartsElement
   * @extends PluginElement
   */
  var LiveAmchartsElement = function LiveAmchartsElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('live.amcharts', {resource: '/widgets'});

    return this;
  };

  return LiveAmchartsElement.extend('LiveAmchartsElement', {

    /**
     * Render Embedded content
     * @memberOf LiveAmchartsElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {

      if (!embed) {
        this.$.empty();
        return false;
      }

      this.$.append(
          this.renderIframe(
              $(embed).attr('src')
          )
      );
    }

  }, PluginElement.prototype);
});
