/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineHromadskeTvController(PluginBase, WidgetContentController) {

  /**
   * Define hromadsketv controller
   * @class HromadskeTvController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var HromadskeTvController = function HromadskeTvController() {
  };

  return HromadskeTvController.extend('HromadskeTvController', {

    /**
     * Set embedded content
     * @memberOf HromadskeTvController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('hromadsketvUrl'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$hromadsketv.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate hromadsketv
     * @memberOf HromadskeTvController
     * @param {string} url
     * @return {string|boolean}
     */
    getEmbedCode: function getEmbedCode(url) {

      if (!url) {
        this.scope.logger.debug('Initial state');
        return false;
      }

      var mask = this.model.getConfig('mask'),
          regex = this.model.getConfig('regex');

      if (!url.match(regex)) {
        this.scope.logger.warn('Invalid hromadsketv url');
        return false;
      }

      if (url.match(/iframe/)) {

        /**
         * Embed iframe fix
         * @type {string}
         */
        url = $(url).attr('src');
      }

      return url.replace(regex, mask.replace(/\{videoId}/g, '$1')).
          replace(/embed\/embed/, 'embed');
    },

    /**
     * Add HromadskeTv rule
     * @memberOf HromadskeTvController
     * @param {Event} e
     */
    addHromadskeTvRule: function addHromadskeTvRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
