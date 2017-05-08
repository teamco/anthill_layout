/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineTinyPicElement(PluginElement) {

  /**
   * Define TinyPic Element
   * @param view
   * @param opts
   * @returns {TinyPicElement}
   * @constructor
   * @class TinyPicElement
   * @extends PluginElement
   */
  var TinyPicElement = function TinyPicElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('tiny.pic', {resource: '/widgets'});

    return this;
  };

  return TinyPicElement.extend('TinyPicElement', {

    /**
     * Render Embedded content
     * @memberOf TinyPicElement
     * @param {boolean|{type, code}} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {

      if (!embed) {
        return false;
      }

      /**
       * Define $content
       */
      var $content = embed.type === 'image' ?
          embed.code :
          this.renderEmbed(embed.code);

      this.$.append($content);
    }

  }, PluginElement.prototype);

});
