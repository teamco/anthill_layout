/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineIframelyEventManager(WidgetContentEventManager) {

  /**
   * Define Iframely event manager
   * @class IframelyEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var IframelyEventManager = function IframelyEventManager() {

    this.updateEventList({});
  };

  return IframelyEventManager.extend(
      'IframelyEventManager', {},
      WidgetContentEventManager.prototype
  );
});
