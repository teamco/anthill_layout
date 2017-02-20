/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineSomeEcardsController(PluginBase, WidgetContentController) {

  /**
   * Define someecards controller
   * @class SomeEcardsController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var SomeEcardsController = function SomeEcardsController() {
  };

  return SomeEcardsController.extend('SomeEcardsController', {

    /**
     * Set embedded content
     * @memberOf SomeEcardsController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$someecards.renderEmbeddedContent(
          this.model.getPrefs('someecardsEmbedCode')
      );
    },

    /**
     * Add SomeEcards rule
     * @memberOf SomeEcardsController
     * @param {Event} e
     */
    addSomeEcardsRule: function addSomeEcardsRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
