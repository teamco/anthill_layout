/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSoundCloudEventManager(WidgetContentEventManager) {

  /**
   * Define SoundCloud event manager
   * @class SoundCloudEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SoundCloudEventManager = function SoundCloudEventManager() {

    this.updateEventList({});
  };

  return SoundCloudEventManager.extend('SoundCloudEventManager', {},
      WidgetContentEventManager.prototype);
});
