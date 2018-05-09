/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseElement
 * @type {module.BaseElement}
 */
const BaseElement = require('../../lib/modules/Element.js');

/**
 * Define Workspace content element
 * @class WorkspaceContentElement
 * @type {module.WorkspaceContentElement}
 * @extends BaseElement
 */
module.exports = class WorkspaceContentElement extends BaseElement {

  /**
   * @param {WorkspaceView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WorkspaceContentElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);
  }

  /**
   * Define width after add page
   * @property WorkspaceContentElement
   * @param {number} to
   */
  defineWidth(to) {

    this.$.css({
      width: (100 * to) + '%'
    });
  }

  /**
   * Define pages width after add page
   * @property WorkspaceContentElement
   * @param {*} items
   * @param {number} counter
   */
  adoptPagesWidth(items, counter) {

    let index, $item;
    for (index in items) {

      if (items.hasOwnProperty(index)) {

        /**
         * Define page
         * @type {Page}
         */
        $item = items[index].view.get$item();
        $item.setWidth((100 / counter) + '%');
      }
    }
  }

  /**
   * Swipe container to current page
   * @property WorkspaceContentElement
   * @param {Page} page
   */
  swipeTo(page) {

    /**
     * Define view
     * @type {Workspace}
     */
    const scope = this.view.scope;
    const animate = page.model.getConfig('preferences').animateSwipe,
        duration = 500;

    /**
     * Define on complete callback
     * @private
     */
    function _completeCallback() {
      scope.observer.publish(scope.eventManager.eventList.afterSwitchToPage, page);
    }

    /**
     * Get $pages
     * @type {WorkspaceContentElement}
     */
    const $pages = this.view.elements.$pages;

    /**
     * Get pages order
     * @type {number}
     */
    const order = page.model.getConfig('order') - 1,
        css = {left: (-order * 100) + '%'};

    if (_.isUndefined(animate) ?
        scope.model.getConfig('page').animateSwipe : !!animate) {

      $pages.$.stop().animate(css, {
        duration: duration,
        complete: _completeCallback
      });

    } else {

      $pages.$.css(css);
      _completeCallback();
    }
  }
};