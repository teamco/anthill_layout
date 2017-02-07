/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineAnimatronEventManager(WidgetContentEventManager) {

  /**
   * Define Animatron event manager
   * @class AnimatronEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var AnimatronEventManager = function AnimatronEventManager() {

    this.updateEventList({});
  };

  return AnimatronEventManager.extend(
      'AnimatronEventManager', {},
      WidgetContentEventManager.prototype
  );
});
