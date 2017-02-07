/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineOdnoklassnikiEventManager(WidgetContentEventManager) {

  /**
   * Define Odnoklassniki event manager
   * @class OdnoklassnikiEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var OdnoklassnikiEventManager = function OdnoklassnikiEventManager() {

    this.updateEventList({});
  };

  return OdnoklassnikiEventManager.extend(
      'OdnoklassnikiEventManager', {},
      WidgetContentEventManager.prototype
  );
});
