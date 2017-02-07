/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineFilmRuEventManager(WidgetContentEventManager) {

  /**
   * Define FilmRu event manager
   * @class FilmRuEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var FilmRuEventManager = function FilmRuEventManager() {

    this.updateEventList({});
  };

  return FilmRuEventManager.extend(
      'FilmRuEventManager', {},
      WidgetContentEventManager.prototype
  );
});
