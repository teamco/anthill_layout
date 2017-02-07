/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineInfogrAmController(PluginBase, WidgetContentController) {

  /**
   * Define InfogrAm controller
   * @class InfogrAmController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var InfogrAmController = function InfogrAmController() {
  };

  return InfogrAmController.extend('InfogrAmController', {

    /**
     * Set embedded content
     * @memberOf InfogrAmController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('infogramEmbedCode')
      );
    },

    /**
     * Add InfogrAm rule
     * @memberOf InfogrAmController
     * @param {Event} e
     */
    addInfogrAmRule: function addInfogrAmRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
