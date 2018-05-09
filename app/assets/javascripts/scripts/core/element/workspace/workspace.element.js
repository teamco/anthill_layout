/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseElement
 * @type {BaseElement|*}
 */
const BaseElement = require('../../lib/modules/Element.js');

/**
 * Define Workspace element
 * @extends BaseElement
 * @class WorkspaceElement
 * @type {module.WorkspaceElement}
 * @constructor
 */
module.exports = class WorkspaceElement extends BaseElement {

  /**
   * @param {WorkspaceView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WorkspaceElement', view, false);
    this._config(view, opts, $('<li />')).build(opts);
  }

  /**
   * Get site author
   * @property WorkspaceElement
   * @returns {string}
   */
  getSiteAuthor() {
    return $('meta[name="author"]').attr('content');
  }

  /**
   * Set site author
   * @property WorkspaceElement
   * @param {string} author
   */
  setSiteAuthor(author) {
    $('meta[name="author"]').attr('content', author);
  }

  /**
   * Get site title
   * @property WorkspaceElement
   * @returns {jQuery|string}
   */
  getSiteTitle() {
    return $('title').text();
  }

  /**
   * Set site title
   * @property WorkspaceElement
   * @param {string} title
   */
  setSiteTitle(title) {
    $('title').text(title);
  }

  /**
   * Set workspace width
   * @property WorkspaceElement
   * @param {number} width
   */
  updateWidth(width) {

    if (typeof(width) !== 'number') {
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
   * @property WorkspaceElement
   */
  unserWidth() {
    this.$.attr('class', this.$.attr('class').replace(/sw-\d{1,2}/, ''));
  }

  /**
   * Define active page
   * @property WorkspaceElement
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

    item.view.get$item().setVisibility(true);
  }
};