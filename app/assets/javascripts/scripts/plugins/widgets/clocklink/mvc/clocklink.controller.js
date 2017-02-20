/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineClocklinkController(PluginBase, WidgetContentController) {

  /**
   * Define Clocklink controller
   * @class ClocklinkController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var ClocklinkController = function ClocklinkController() {
  };

  return ClocklinkController.extend('ClocklinkController', {

    /**
     * Set embedded content
     * @memberOf ClocklinkController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$clocklink.renderEmbeddedContent(
          this.controller.parseEmbedCode()
      );
    },

    /**
     * Define embed code parser
     * @memberOf ClocklinkController
     * @returns {{type: string, code: string}}
     */
    parseEmbedCode: function parseEmbedCode() {

      /**
       * Get embed prefs
       * @type {string}
       */
      var embedCode = this.model.getPrefs('clocklinkEmbedCode') || '',

          /**
           * Define embed object
           * @type {{type: string, code: string}}
           */
          embed = {code: embedCode};

      if (embedCode.length > 0) {
        this.clearParentThumbnail();
      }

      if (embedCode.match(/^<iframe/)) {
        embed.type = 'iframe';
      }

      if (embedCode.match(/^<embed/)) {
        embed.type = 'embed';
      }

      if (embedCode.match(/^<script/)) {
        embed.type = 'script'
      }

      return embed;
    },

    /**
     * Add Clocklink rule
     * @memberOf ClocklinkController
     * @param {Event} e
     */
    addClocklinkRule: function addClocklinkRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
