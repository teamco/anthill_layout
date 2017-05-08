/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineCodepenIoEventManager(WidgetContentEventManager) {

  /**
   * Define CodepenIo event manager
   * @class CodepenIoEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var CodepenIoEventManager = function CodepenIoEventManager() {

    this.updateEventList({});
  };

  return CodepenIoEventManager.extend(
      'CodepenIoEventManager', {},
      WidgetContentEventManager.prototype
  );
});
