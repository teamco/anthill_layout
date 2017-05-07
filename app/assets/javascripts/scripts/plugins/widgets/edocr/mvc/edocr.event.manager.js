/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineEdocrEventManager(WidgetContentEventManager) {

  /**
   * Define Edocr event manager
   * @class EdocrEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var EdocrEventManager = function EdocrEventManager() {

    this.updateEventList({});
  };

  return EdocrEventManager.extend(
      'EdocrEventManager', {},
      WidgetContentEventManager.prototype
  );
});
