/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/13/15
 * Time: 8:48 PM
 */

/**
 * @class WidgetComment
 * @type {WidgetComment}
 */
export class WidgetComment {

  /**
   * Define commentable content
   * @memberOf WidgetComment
   * @param {boolean} commentable
   */
  commentableContent(commentable) {

    if (!commentable) {
      return false;
    }

    this.view.contentComments();

    if (this.view.elements.$comments) {
      this.view.elements.$comments.destroy();
    }
  }

  /**
   * Define post comment
   * @memberOf WidgetComment
   */
  postComment() {
    debugger;
  }

  /**
   * Define cancel comment
   * @memberOf WidgetComment
   */
  cancelComment() {
    debugger;
  }
}
  