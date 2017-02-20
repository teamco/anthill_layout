/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function definePizapPhotoEditorEventManager(WidgetContentEventManager) {

  /**
   * Define PizapPhotoEditor event manager
   * @class PizapPhotoEditorEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var PizapPhotoEditorEventManager = function PizapPhotoEditorEventManager() {

    this.updateEventList({});
  };

  return PizapPhotoEditorEventManager.extend(
      'PizapPhotoEditorEventManager', {},
      WidgetContentEventManager.prototype
  );
});
