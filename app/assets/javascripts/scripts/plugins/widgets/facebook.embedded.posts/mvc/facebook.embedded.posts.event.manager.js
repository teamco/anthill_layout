/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'plugins/widgets/widget.content.event.manager'
], function defineFacebookEmbeddedPostsEventManager(WidgetContentEventManager) {

  /**
   * Define FacebookEmbeddedPosts event manager
   * @class FacebookEmbeddedPostsEventManager
   * @constructor
   * @extends BaseEvent
   * @extends WidgetContentEventManager
   */
  var FacebookEmbeddedPostsEventManager = function FacebookEmbeddedPostsEventManager() {

    this.updateEventList({});
  };

  return FacebookEmbeddedPostsEventManager.extend(
      'FacebookEmbeddedPostsEventManager', {},
      WidgetContentEventManager.prototype
  );
});
