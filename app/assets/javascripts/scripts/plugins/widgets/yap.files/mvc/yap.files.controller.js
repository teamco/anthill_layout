/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineYapFilesController(PluginBase, WidgetContentController) {

  /**
   * Define yapfiles controller
   * @class YapFilesController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var YapFilesController = function YapFilesController() {
  };

  return YapFilesController.extend('YapFilesController', {

    /**
     * Set embedded content
     * @memberOf YapFilesController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('yapfilesEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$yapfiles.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate yapfiles
     * @memberOf YapFilesController
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

        return $(embed);

      } else {

        this.scope.logger.warn('Invalid YapFiles embed code');
        return false;
      }
    },

    /**
     * Add YapFiles rule
     * @memberOf YapFilesController
     * @param {Event} e
     */
    addYapFilesRule: function addYapFilesRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
