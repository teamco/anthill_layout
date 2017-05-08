/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineEmbedArticlesEventManager(WidgetContentEventManager) {

  /**
   * Define EmbedArticles event manager
   * @class EmbedArticlesEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var EmbedArticlesEventManager = function EmbedArticlesEventManager() {

    this.updateEventList({});
  };

  return EmbedArticlesEventManager.extend(
      'EmbedArticlesEventManager', {},
      WidgetContentEventManager.prototype
  );
});
