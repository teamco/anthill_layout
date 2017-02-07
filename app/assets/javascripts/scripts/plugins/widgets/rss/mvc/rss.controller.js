/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineRssController(PluginBase, WidgetContentController) {

  /**
   * Define youtube controller
   * @class RssController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var RssController = function RssController() {
  };

  return RssController.extend('RssController', {

    /**
     * Set embedded content
     * @memberOf RssController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$rss.renderEmbeddedContent(
          this.model.getPrefs('rssFeedUrl')
      );
    },

    /**
     * Parse RSS
     * @memberOf RssController
     * @param {string} url
     * @param {function} callback
     */
    parseRss: function parseRss(url, callback) {

      if (!this.base.isUrl(url + '')) {
        this.logger.warn('The specified feed URL is invalid', url);
        return false;
      }

      $.ajax({
        url: [
          window.location.protocol,
          this.model.getConfig('googleAPIUrl'),
          encodeURIComponent(url)
        ].join(''),
        dataType: 'json',
        success: callback
      });
    },

    /**
     * Add Rss rule
     * @memberOf RssController
     * @param {Event} e
     */
    addRssRule: function addRssRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});