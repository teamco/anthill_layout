/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineSpeakerDeckController(PluginBase, WidgetContentController) {

  /**
   * Define SpeakerDeck controller
   * @class SpeakerDeckController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var SpeakerDeckController = function SpeakerDeckController() {
  };

  return SpeakerDeckController.extend('SpeakerDeckController', {

    /**
     * Set embedded content
     * @memberOf SpeakerDeckController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.get$item().renderEmbeddedContent(
          this.model.getPrefs('speakerdeckEmbedCode')
      );
    },

    /**
     * Add SpeakerDeck rule
     * @memberOf SpeakerDeckController
     * @param {Event} e
     */
    addSpeakerDeckRule: function addSpeakerDeckRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
