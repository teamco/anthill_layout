/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineKremController(PluginBase, WidgetContentController) {

  /**
   * Define krem controller
   * @class KremController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var KremController = function KremController() {
  };

  return KremController.extend('KremController', {

    /**
     * Set embedded content
     * @memberOf KremController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('kremEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$krem.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate krem
     * @memberOf KremController
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

      if (embed.match(/^<object/)) {

        return embed;

      } else {

        this.scope.logger.warn('Invalid Krem embed code');
        return false;
      }
    },

    /**
     * Add Krem rule
     * @memberOf KremController
     * @param {Event} e
     */
    addKremRule: function addKremRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
