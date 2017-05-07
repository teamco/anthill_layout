/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineMetaUaController(PluginBase, WidgetContentController) {

  /**
   * Define meta controller
   * @class MetaUaController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var MetaUaController = function MetaUaController() {
  };

  return MetaUaController.extend('MetaUaController', {

    /**
     * Set embedded content
     * @memberOf MetaUaController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('metauaUrl'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$metaua.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate meta
     * @memberOf MetaUaController
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

      return mask.replace(/\{id}/g, regex[0]);
    },

    /**
     * Add MetaUa rule
     * @memberOf MetaUaController
     * @param {Event} e
     */
    addMetaUaRule: function addMetaUaRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
