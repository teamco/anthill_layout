/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineAnimotoController(PluginBase, WidgetContentController) {

  /**
   * Define animoto controller
   * @class AnimotoController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var AnimotoController = function AnimotoController() {
  };

  return AnimotoController.extend('AnimotoController', {

    /**
     * Set embedded content
     * @memberOf AnimotoController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Get url
       * @type {string|*}
       */
      var url = this.model.getPrefs('animotoEmbedCode'),
          embed = this.controller.getEmbedCode(url);

      if (embed) {
        this.view.elements.$animoto.renderEmbeddedContent(embed);
      }
    },

    /**
     * Validate animoto
     * @memberOf AnimotoController
     * @param {string} embed
     * @return {string|boolean}
     */
    getEmbedCode: function getEmbedCode(embed) {

      if (!embed) {
        this.scope.logger.debug('Initial state');
        return false;
      }

      var $embed = $(embed);

      if (embed.match(/iframe/)) {

        return {
          type: 'iframe',
          id: $embed.attr('id'),
          movie: $embed.attr('src')
        };
      }

      if (embed.match(/object/)) {

        return {
          type: 'object',
          id: $embed.attr('id'),
          classid: $embed.attr('classid'),
          movie: $embed.find('param[name="movie"]').val()
        };
      }
    },

    /**
     * Add Animoto rule
     * @memberOf AnimotoController
     * @param {Event} e
     */
    addAnimotoRule: function addAnimotoRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
