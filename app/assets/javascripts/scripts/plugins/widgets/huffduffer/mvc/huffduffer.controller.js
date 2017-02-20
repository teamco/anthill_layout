/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineHuffdufferController(PluginBase, WidgetContentController) {

  /**
   * Define Huffduffer controller
   * @class HuffdufferController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var HuffdufferController = function HuffdufferController() {
  };

  return HuffdufferController.extend('HuffdufferController', {

    /**
     * Set embedded content
     * @memberOf HuffdufferController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('huffdufferEmbedCode')
      );
    },

    /**
     * Add Huffduffer rule
     * @memberOf HuffdufferController
     * @param {Event} e
     */
    addHuffdufferRule: function addHuffdufferRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
