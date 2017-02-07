/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function definePreziController(PluginBase, WidgetContentController) {

  /**
   * Define prezi controller
   * @class PreziController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var PreziController = function PreziController() {
  };

  return PreziController.extend('PreziController', {

    /**
     * Set embedded content
     * @memberOf PreziController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('preziEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$prezi.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate prezi
     * @memberOf PreziController
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

        this.scope.logger.warn('Invalid Prezi embed code');
        return false;
      }
    },

    /**
     * Add Prezi rule
     * @memberOf PreziController
     * @param {Event} e
     */
    addPreziRule: function addPreziRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
