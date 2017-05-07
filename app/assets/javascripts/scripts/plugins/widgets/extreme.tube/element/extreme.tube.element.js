/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineExtremeTubeElement(PluginElement) {

  /**
   * Define ExtremeTube Element
   * @param view
   * @param opts
   * @returns {ExtremeTubeElement}
   * @constructor
   * @class ExtremeTubeElement
   * @extends PluginElement
   */
  var ExtremeTubeElement = function ExtremeTubeElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('extreme.tube', {resource: '/widgets'});

    return this;
  };

  return ExtremeTubeElement.extend('ExtremeTubeElement', {

    /**
     * Render Embedded content
     * @memberOf ExtremeTubeElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
