/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineTviController(PluginBase, WidgetContentController) {

  /**
   * Define tvi controller
   * @class TviController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var TviController = function TviController() {
  };

  return TviController.extend('TviController', {

    /**
     * Set embedded content
     * @memberOf TviController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('tviEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$tvi.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate tvi
     * @memberOf TviController
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
        this.scope.logger.warn('Invalid tvi url');
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
     * Add Tvi rule
     * @memberOf TviController
     * @param {Event} e
     */
    addTviRule: function addTviRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
