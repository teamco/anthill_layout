/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineGiphyElement(PluginElement) {

  /**
   * Define Giphy Element
   * @param view
   * @param opts
   * @returns {GiphyElement}
   * @constructor
   * @class GiphyElement
   * @extends PluginElement
   */
  var GiphyElement = function GiphyElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('giphy', {resource: '/widgets'});

    return this;
  };

  return GiphyElement.extend('GiphyElement', {

    /**
     * Render Embedded content
     * @memberOf GiphyElement
     * @param {{src, type, [id], [width], [height]}} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {

      /**
       * Define content
       * @type {*|jQuery}
       */
      var $content = embed.type === 'iframe' ?
          this.renderIframe(embed.src) :
          embed.src;

      this.$.append($content);

      if (embed.type === 'js') {
        window._giphy = window._giphy || [];
        window._giphy.push({
          id: embed.id,
          w: embed.width,
          h: embed.height
        });

        require(['//giphy.com/static/js/widgets/embed.js']);
      }
    }

  }, PluginElement.prototype);

});



