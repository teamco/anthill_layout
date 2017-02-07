/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineImageGalleryEventManager(WidgetContentEventManager) {

  /**
   * Define ImageGallery event manager
   * @class ImageGalleryEventManager
   * @constructor
   * @extends WidgetContentEventManager
   * @extends BaseEvent
   */
  var ImageGalleryEventManager = function ImageGalleryEventManager() {

    this.updateEventList({});
  };

  return ImageGalleryEventManager.extend('ImageGalleryEventManager', {},
      WidgetContentEventManager.prototype);
});