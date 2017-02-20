/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/13/15
 * Time: 8:48 PM
 */

define(function defineWidgetComment() {

  /**
   * Define WidgetComment
   * @class WidgetComment
   * @extends AntHill
   * @constructor
   */
  var WidgetComment = function WidgetComment() {
  };

  return WidgetComment.extend('WidgetComment', {

    /**
     * Define commentable content
     * @memberOf WidgetComment
     * @param {boolean} commentable
     */
    commentableContent: function commentableContent(commentable) {

      if (_.isUndefined(commentable)) {
        return false;
      }

      if (commentable) {

        this.view.contentComments();

      } else if (this.view.elements.$comments) {

        this.view.elements.$comments.destroy();
      }
    },

    /**
     * Define post comment
     * @memberOf WidgetComment
     */
    postComment: function postComment() {
      debugger
    },

    /**
     * Define cancel comment
     * @memberOf WidgetComment
     */
    cancelComment: function cancelComment() {
      debugger
    }
  });
});