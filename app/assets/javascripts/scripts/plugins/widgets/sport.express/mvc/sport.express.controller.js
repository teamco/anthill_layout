/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineSportExpressController(PluginBase, WidgetContentController) {

  /**
   * Define sportexpress controller
   * @class SportExpressController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var SportExpressController = function SportExpressController() {
  };

  return SportExpressController.extend('SportExpressController', {

    /**
     * Set embedded content
     * @memberOf SportExpressController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('sportexpressEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$sportexpress.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate sportexpress
     * @memberOf SportExpressController
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

        return $(embed)[0];

      } else {

        this.scope.logger.warn('Invalid SportExpress embed code');
        return false;
      }
    },

    /**
     * Add SportExpress rule
     * @memberOf SportExpressController
     * @param {Event} e
     */
    addSportExpressRule: function addSportExpressRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
