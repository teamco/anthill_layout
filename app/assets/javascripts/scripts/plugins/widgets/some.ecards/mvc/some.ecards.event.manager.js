/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineSomeEcardsEventManager(WidgetContentEventManager) {

  /**
   * Define SomeEcards event manager
   * @class SomeEcardsEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var SomeEcardsEventManager = function SomeEcardsEventManager() {

    this.updateEventList({});
  };

  return SomeEcardsEventManager.extend('SomeEcardsEventManager', {},
      WidgetContentEventManager.prototype);
});
