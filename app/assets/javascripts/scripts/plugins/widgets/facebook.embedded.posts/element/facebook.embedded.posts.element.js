/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineFacebookEmbeddedPostsElement(PluginElement) {

  /**
   * Define FacebookEmbeddedPosts Element
   * @param view
   * @param opts
   * @returns {FacebookEmbeddedPostsElement}
   * @constructor
   * @class FacebookEmbeddedPostsElement
   * @extends PluginElement
   */
  var FacebookEmbeddedPostsElement = function FacebookEmbeddedPostsElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('facebook.embedded.posts', {resource: '/widgets'});

    return this;
  };

  return FacebookEmbeddedPostsElement.extend('FacebookEmbeddedPostsElement', {

    /**
     * Render Embedded content
     * @memberOf FacebookEmbeddedPostsElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.$.append(
          this.renderIframe(
              $(embed).attr('src')
          )
      );
    }

  }, PluginElement.prototype);
});
