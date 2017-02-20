/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineFapaTvController(PluginBase, WidgetContentController) {

  /**
   * Define fapatv controller
   * @class FapaTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var FapaTvController = function FapaTvController() {
  };

  return FapaTvController.extend('FapaTvController', {

    /**
     * Set embedded content
     * @memberOf FapaTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('fapatvEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$fapatv.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate fapatv
     * @memberOf FapaTvController
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

        this.scope.logger.warn('Invalid FapaTv embed code');
        return false;
      }
    },

    /**
     * Add FapaTv rule
     * @memberOf FapaTvController
     * @param {Event} e
     */
    addFapaTvRule: function addFapaTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
