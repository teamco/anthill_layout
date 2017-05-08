/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineTubeEightController(PluginBase, WidgetContentController) {

  /**
   * Define tubeeight controller
   * @class TubeEightController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var TubeEightController = function TubeEightController() {
  };

  return TubeEightController.extend('TubeEightController', {

    /**
     * Set embedded content
     * @memberOf TubeEightController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('tubeeightEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$tubeeight.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate tubeeight
     * @memberOf TubeEightController
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

        this.scope.logger.warn('Invalid TubeEight embed code');
        return false;
      }
    },

    /**
     * Add TubeEight rule
     * @memberOf TubeEightController
     * @param {Event} e
     */
    addTubeEightRule: function addTubeEightRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
