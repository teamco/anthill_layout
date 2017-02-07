/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineRadikalFotoController(PluginBase, WidgetContentController) {

  /**
   * Define radikalfoto controller
   * @class RadikalFotoController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var RadikalFotoController = function RadikalFotoController() {
  };

  return RadikalFotoController.extend('RadikalFotoController', {

    /**
     * Set embedded content
     * @memberOf RadikalFotoController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$radikalfoto.renderEmbeddedContent(
          this.model.getPrefs('radikalfotoUrl')
      );
    },

    /**
     * Add RadikalFoto rule
     * @memberOf RadikalFotoController
     * @param {Event} e
     */
    addRadikalFotoRule: function addRadikalFotoRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
