/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineSyntaxHighlighterController(PluginBase,
    WidgetContentController) {

  /**
   * Define SyntaxHighlighter controller
   * @class SyntaxHighlighterController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var SyntaxHighlighterController = function SyntaxHighlighterController() {
  };

  return SyntaxHighlighterController.extend('SyntaxHighlighterController', {

    /**
     * Set embedded content
     * @memberOf SyntaxHighlighterController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      // Get file type
      var type = this.model.getPrefs('syntaxhighlighterType');

      this.view.elements.$syntaxhighlighter.renderEmbeddedContent(
          this.model.getPrefs('syntaxhighlighterCode'),
          this.model.getEntityByName('file', type),
          this.model.getEntityByName('alias', type)
      );
    },

    /**
     * Add SyntaxHighlighter rule
     * @memberOf SyntaxHighlighterController
     * @param {Event} e
     */
    addSyntaxHighlighterRule: function addSyntaxHighlighterRule(e) {

      /**
       * Define $button
       * @type {*|jQuery|HTMLElement}
       */
      var $button = $(e.target),
          scope = this.scope;

      scope.observer.publish(
          scope.eventmanager.eventList.publishRule,
          [$button.attr('value'), this.scope.name]
      );
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
