/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSpeakerDeckEventManager(WidgetContentEventManager) {

  /**
   * Define SpeakerDeck event manager
   * @class SpeakerDeckEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SpeakerDeckEventManager = function SpeakerDeckEventManager() {

    this.updateEventList({});
  };

  return SpeakerDeckEventManager.extend(
      'SpeakerDeckEventManager', {},
      WidgetContentEventManager.prototype
  );
});
