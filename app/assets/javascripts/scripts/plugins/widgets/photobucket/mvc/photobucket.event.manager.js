/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function definePhotobucketEventManager(WidgetContentEventManager) {

  /**
   * Define Photobucket event manager
   * @class PhotobucketEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var PhotobucketEventManager = function PhotobucketEventManager() {

    this.updateEventList({});
  };

  return PhotobucketEventManager.extend('PhotobucketEventManager', {},
      WidgetContentEventManager.prototype);
});
