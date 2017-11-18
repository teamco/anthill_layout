/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Element',
  'element/button.element'
], function defineComment(BaseElement, ButtonElement) {

  /**
   * Define Comment
   * @param view
   * @param opts
   * @returns {WidgetCommentElement}
   * @class WidgetCommentElement
   * @constructor
   * @extends BaseElement
   */
  var WidgetCommentElement = function WidgetCommentElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.defineContent(ButtonElement);

    return this;
  };

  return WidgetCommentElement.extend('WidgetCommentElement', {

    /**
     * Define comments content
     * @param {ButtonElement} ButtonElement
     */
    defineContent: function defineContent(ButtonElement) {

      this.renderCommentsForm(ButtonElement, {
        visible: true
      });
    }

  }, BaseElement.prototype);
});