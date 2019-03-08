/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../../modules/Element';

/**
 * Define Workspace element
 * @extends BaseElement
 * @class WorkspaceElement
 * @type {WorkspaceElement}
 */
export class WorkspaceElement extends BaseElement {

  /**
   * @param {WorkspaceView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WorkspaceElement', view);
    this._config(view, opts, '<workspace />').build(opts);
  }

  /**
   * Get site author
   * @memberOf WorkspaceElement
   * @static
   * @returns {string}
   */
  static getSiteAuthor() {
    return document.querySelector('meta[name="author"]').getAttribute('content');
  }

  /**
   * Set site author
   * @memberOf WorkspaceElement
   * @static
   * @param {string} author
   */
  static setSiteAuthor(author) {
    document.querySelector('meta[name="author"]').setAttribute('content', author);
  }

  /**
   * Get site title
   * @memberOf WorkspaceElement
   * @static
   * @returns {jQuery|string}
   */
  static getSiteTitle() {
    return document.querySelector('title').innerText;
  }

  /**
   * Set site title
   * @memberOf WorkspaceElement
   * @static
   * @param {string} title
   */
  static setSiteTitle(title) {
    document.querySelector('title').innerText = title;
  }

  /**
   * Set workspace width
   * @memberOf WorkspaceElement
   * @param {number} width
   */
  updateWidth(width) {

    if (typeof (width) !== 'number') {
      this.view.scope.logger.warn('Width should be numeric');
      return false;
    }

    let style = this.$.attr('class'),
        regex = /sw-\d{1,2}/;

    style = style.match(regex) ?
        style.replace(regex, 'sw-' + width) :
        style + ' sw-' + width;

    this.$.attr('class', style);
  }

  /**
   * Unset workspace width
   * @memberOf WorkspaceElement
   */
  unsetWidth() {
    this.$.attr('class', this.$.attr('class').replace(/sw-\d{1,2}/, ''));
  }

  /**
   * Define active page
   * @memberOf WorkspaceElement
   * @param {{Page}} items
   * @param {Page} item
   */
  defineActivePage(items, item) {

    let index, page;
    for (index in items) {

      if (items.hasOwnProperty(index)) {

        /**
         * Get page
         * @type {Page}
         */
        page = items[index];

        if (page !== item) {
          page.view.get$item().setVisibility(false);
        }
      }
    }

    item.view ?
        item.view.get$item().setVisibility(true) :
        this.view.scope.logger.warn('Item with no View', item);
  }
}