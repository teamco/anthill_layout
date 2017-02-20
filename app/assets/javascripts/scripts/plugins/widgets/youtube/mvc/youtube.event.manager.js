/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineYoutubeEventManager(WidgetContentEventManager) {

  /**
   * Define Youtube event manager
   * @class YoutubeEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var YoutubeEventManager = function YoutubeEventManager() {

    this.updateEventList({});
  };

  return YoutubeEventManager.extend('YoutubeEventManager', {},
      WidgetContentEventManager.prototype);
});