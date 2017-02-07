/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineDailyMotionElement(PluginElement) {

  /**
   * Define DailyMotion Element
   * @param view
   * @param opts
   * @returns {DailyMotionElement}
   * @constructor
   * @class DailyMotionElement
   * @extends PluginElement
   */
  var DailyMotionElement = function DailyMotionElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('daily.motion', {resource: '/widgets'});

    return this;
  };

  return DailyMotionElement.extend('DailyMotionElement', {

    /**
     * Render Embedded content
     * @memberOf DailyMotionElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          this.renderIframe(url)
      );
    }

  }, PluginElement.prototype);

});
