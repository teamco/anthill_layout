/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineWikimapiaEventManager(WidgetContentEventManager) {

  /**
   * Define Wikimapia event manager
   * @class WikimapiaEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var WikimapiaEventManager = function WikimapiaEventManager() {

    this.updateEventList({});
  };

  return WikimapiaEventManager.extend(
      'WikimapiaEventManager', {},
      WidgetContentEventManager.prototype
  );
});
