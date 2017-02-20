/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineAnimatronElement(PluginElement) {

  /**
   * Define Animatron Element
   * @param view
   * @param opts
   * @returns {AnimatronElement}
   * @constructor
   * @class AnimatronElement
   * @extends PluginElement
   */
  var AnimatronElement = function AnimatronElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('animatron', {resource: '/widgets'});

    return this;
  };

  return AnimatronElement.extend('AnimatronElement', {

    /**
     * Render Embedded content
     * @memberOf AnimatronElement
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
