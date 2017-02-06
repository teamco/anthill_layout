/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineBlipTvController(PluginBase, WidgetContentController) {

  /**
   * Define bliptv controller
   * @class BlipTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var BlipTvController = function BlipTvController() {
  };

  return BlipTvController.extend('BlipTvController', {

    /**
     * Set embedded content
     * @memberOf BlipTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('bliptvEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$bliptv.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate bliptv
     * @memberOf BlipTvController
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

        return $(embed).attr('src');

      } else {

        this.scope.logger.warn('Invalid BlipTv embed code');
        return false;
      }
    },

    /**
     * Add BlipTv rule
     * @memberOf BlipTvController
     * @param {Event} e
     */
    addBlipTvRule: function addBlipTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
