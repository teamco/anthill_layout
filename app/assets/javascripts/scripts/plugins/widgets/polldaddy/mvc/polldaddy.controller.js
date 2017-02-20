/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function definePolldaddyController(PluginBase, WidgetContentController) {

  /**
   * Define polldaddy controller
   * @class PolldaddyController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var PolldaddyController = function PolldaddyController() {
  };

  return PolldaddyController.extend('PolldaddyController', {

    /**
     * Set embedded content
     * @memberOf PolldaddyController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$polldaddy.renderEmbeddedContent(
          this.controller.getEmbeddedId(
              this.model.getPrefs('polldaddyEmbedCode')
          )
      );
    },

    /**
     * Parse embedded content to extract id
     * @memberOf PolldaddyController
     * @param {string} embed
     * @returns {*}
     */
    getEmbeddedId: function getEmbeddedId(embed) {

      if (!embed) {
        this.scope.logger.debug('Initial state');
        return false;
      }

      // Match inline embed code
      var regex = embed.match(/poll\/(\d+)/);

      if (regex) {

        return data = {
          type: 'inline',
          id: regex[1]
        };

      } else {

        this.scope.logger.warn('Invalid embed code');
        return false;
      }
    },

    /**
     * Add Polldaddy rule
     * @memberOf PolldaddyController
     * @param {Event} e
     */
    addPolldaddyRule: function addPolldaddyRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
