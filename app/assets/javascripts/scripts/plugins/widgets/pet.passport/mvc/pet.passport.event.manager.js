/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function definePetPassportEventManager(WidgetContentEventManager) {

  /**
   * Define PetPassport event manager
   * @class PetPassportEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var PetPassportEventManager = function PetPassportEventManager() {

    this.updateEventList({});
  };

  return PetPassportEventManager.extend('PetPassportEventManager', {},
      WidgetContentEventManager.prototype);
});