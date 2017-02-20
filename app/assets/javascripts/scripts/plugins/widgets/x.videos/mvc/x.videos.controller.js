/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineXVideosController(PluginBase, WidgetContentController) {

  /**
   * Define xVideos controller
   * @class XVideosController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var XVideosController = function XVideosController() {
  };

  return XVideosController.extend('XVideosController', {

    /**
     * Set embedded content
     * @memberOf XVideosController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('xvideosUrl'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$xvideos.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate xvideos
     * @memberOf XVideosController
     * @param {string} url
     * @return {string|boolean}
     */
    getEmbedCode: function getEmbedCode(url) {

      if (!url) {
        this.scope.logger.debug('Initial state');
        return false;
      }

      // Convert to string
      url += '';

      if (url.match(/iframe/)) {
        url = $(url).attr('src');
      }

      var mask = this.model.getConfig('mask'),
          regex = url.match(
              this.model.getConfig('regex')
          );

      if (!regex || url.match(/^\[/)) {
        this.scope.logger.warn('Invalid XVideos url');
        return false;
      }

      return mask.replace(/\{id}/g, regex[0]);
    },

    /**
     * Add XVideos rule
     * @memberOf XVideosController
     * @param {Event} e
     */
    addXVideosRule: function addXVideosRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
