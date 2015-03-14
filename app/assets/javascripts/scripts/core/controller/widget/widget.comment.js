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
     * @constructor
     */
    var WidgetComment = function WidgetComment() {
    };

    return WidgetComment.extend('WidgetComment', {

        /**
         * Define commentable content
         * @member WidgetComment
         * @param {boolean} commentable
         */
        commentableContent: function commentableContent(commentable) {

            if (typeof(commentable) === 'undefined') {
                return false;
            }

            if (commentable) {

                this.view.contentComments();

            } else if (this.view.elements.$comments) {

                this.view.elements.$comments.destroy();
            }
        }
    });
});