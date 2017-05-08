/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineRevisionElement(PluginElement) {

  /**
   * Define Revision Element
   * @param view
   * @param opts
   * @returns {RevisionElement}
   * @constructor
   * @class RevisionElement
   * @extends PluginElement
   */
  var RevisionElement = function RevisionElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('revision', {resource: '/widgets'});

    return this;
  };

  return RevisionElement.extend('RevisionElement', {

    /**
     * Render Embedded content
     * @memberOf RevisionElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
