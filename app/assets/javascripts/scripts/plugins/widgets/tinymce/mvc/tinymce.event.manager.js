/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineTinymceEventManager(WidgetContentEventManager) {

  /**
   * Define Tinymce event manager
   * @class TinymceEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var TinymceEventManager = function TinymceEventManager() {

    this.updateEventList({});
  };

  return TinymceEventManager.extend(
      'TinymceEventManager', {},
      WidgetContentEventManager.prototype
  );
});
