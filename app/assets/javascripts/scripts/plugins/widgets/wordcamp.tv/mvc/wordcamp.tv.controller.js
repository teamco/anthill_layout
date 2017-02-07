/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineWordcampTvController(PluginBase, WidgetContentController) {

  /**
   * Define wordcamptv controller
   * @class WordcampTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var WordcampTvController = function WordcampTvController() {
  };

  return WordcampTvController.extend('WordcampTvController', {

    /**
     * Set embedded content
     * @memberOf WordcampTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('wordcamptvEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$wordcamptv.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate wordcamptv
     * @memberOf WordcampTvController
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

      if (embed.match(/^<embed/)) {

        return embed;

      } else {

        this.scope.logger.warn('Invalid WordcampTv embed code');
        return false;
      }
    },

    /**
     * Add WordcampTv rule
     * @memberOf WordcampTvController
     * @param {Event} e
     */
    addWordcampTvRule: function addWordcampTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
