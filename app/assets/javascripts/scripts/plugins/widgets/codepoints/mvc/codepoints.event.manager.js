/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineCodepointsEventManager(WidgetContentEventManager) {

  /**
   * Define Codepoints event manager
   * @class CodepointsEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var CodepointsEventManager = function CodepointsEventManager() {

    this.updateEventList({});
  };

  return CodepointsEventManager.extend(
      'CodepointsEventManager', {},
      WidgetContentEventManager.prototype
  );
});
