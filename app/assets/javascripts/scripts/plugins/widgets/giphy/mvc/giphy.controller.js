/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineGiphyController(PluginBase, WidgetContentController) {

  /**
   * Define giphy controller
   * @class GiphyController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var GiphyController = function GiphyController() {
  };

  return GiphyController.extend('GiphyController', {

    /**
     * Set embedded content
     * @memberOf GiphyController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('giphyEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$giphy.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate giphy
     * @memberOf GiphyController
     * @param {string} embed
     * @return {string|boolean}
     */
    getEmbedCode: function getEmbedCode(embed) {

      if (!embed) {
        this.scope.logger.debug('Initial state');
        return false;
      }

      // Convert to string
      embed += '';

      if (embed.match(/^<iframe/)) {

        return {
          type: 'iframe',
          src: $(embed).attr('src')
        };
      }

      if (embed.match(/^<div/)) {

        var $embed = $(embed),
            id = $embed[0].id.replace(/_giphy_/, ''),
            width = $embed[1].outerHTML.match(/w\:(| )(\d+)/),
            height = $embed[1].outerHTML.match(/h\:(| )(\d+)/);

        return {
          type: 'js',
          src: $($embed[0]).attr('style', ''),
          id: id,
          width: width ? width[2] : 0,
          height: height ? height[2] : 0
        };
      }

      this.scope.logger.warn('Invalid Giphy embed code');
    },

    /**
     * Add Giphy rule
     * @memberOf GiphyController
     * @param {Event} e
     */
    addGiphyRule: function addGiphyRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
