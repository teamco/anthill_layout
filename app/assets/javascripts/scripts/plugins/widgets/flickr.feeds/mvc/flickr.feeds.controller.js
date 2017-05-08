/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineFlickrFeedsController(PluginBase, WidgetContentController) {

  /**
   * Define FlickrFeeds controller
   * @class FlickrFeedsController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var FlickrFeedsController = function FlickrFeedsController() {
  };

  return FlickrFeedsController.extend('FlickrFeedsController', {

    /**
     * Set embedded content
     * @memberOf FlickrFeedsController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$flickrfeeds.renderEmbeddedContent(
          this.model.getListObjectBySelectedValue(), {
            tags: this.model.getPrefs('flickrfeedsTags'),
            user_id: this.model.getPrefs('flickrfeedsUserId'),
            max_length: parseInt(
                this.model.getPrefs('flickrfeedsMaxItems'),
                10
            )
          }
      );
    },

    /**
     * Add FlickrFeeds rule
     * @memberOf FlickrFeedsController
     * @param {Event} e
     */
    addFlickrFeedsRule: function addFlickrFeedsRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
