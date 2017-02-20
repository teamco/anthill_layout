/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineImageEventManager(WidgetContentEventManager) {

  /**
   * Define Image event manager
   * @class ImageEventManager
   * @constructor
   * @extends WidgetContentEventManager
   * @extends BaseEvent
   */
  var ImageEventManager = function ImageEventManager() {

    this.updateEventList({
      checkEmbeddedContent: 'check.embedded.content',
      splitEmbeddedContent: 'split.embedded.content'
    });
  };

  return ImageEventManager.extend('ImageEventManager', {},
      WidgetContentEventManager.prototype);
});