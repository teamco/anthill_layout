/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function definePdfEventManager(WidgetContentEventManager) {

  /**
   * Define Pdf event manager
   * @class PdfEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var PdfEventManager = function PdfEventManager() {

    this.updateEventList({});
  };

  return PdfEventManager.extend('PdfEventManager', {},
      WidgetContentEventManager.prototype);
});