/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */
import {ButtonElement} from '../button.element';
import {BaseElement} from '../../../modules/Element';

/**
 * Define Comment
 * @param view
 * @param opts
 * @class WidgetCommentElement
 * @constructor
 * @extends BaseElement
 */
export class WidgetCommentElement extends BaseElement{

  constructor(view, opts) {
    super('WidgetCommentElement', view);
    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.defineContent(ButtonElement);
  }

  /**
   * Define comments content
   * @param {ButtonElement} ButtonElement
   */
  defineContent(ButtonElement) {
    this.renderCommentsForm(ButtonElement, {
      visible: true
    });
  }
}