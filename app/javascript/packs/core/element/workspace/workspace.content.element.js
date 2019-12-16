/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../../modules/Element';

/**
 * Define Workspace content element
 * @class WorkspaceContentElement
 * @type {WorkspaceContentElement}
 * @extends BaseElement
 */
export class WorkspaceContentElement extends BaseElement {

  /**
   * @param {WorkspaceView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WorkspaceContentElement', view);
    this._config(view, opts, '<pages />').build(opts);
  }

  /**
   * Define width after add page
   * @memberOf WorkspaceContentElement
   * @param {number} to
   */
  defineWidth(to) {
    this.$.css({width: (100 * to) + '%'});
  }

  /**
   * Define pages width after add page
   * @memberOf WorkspaceContentElement
   * @param {*} items
   * @param {number} counter
   */
  adoptPagesWidth(items, counter) {

    let index, $item;
    for (index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {

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
   * @memberOf WorkspaceContentElement
   * @param {Page|{containment}} page
   */
  swipeTo(page) {

    /**
     * Define view
     * @type {Workspace|AntHill}
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
    const css = page.controller.adaptLeftPosition();

    if (animate ? !!animate : scope.model.getConfig('page').animateSwipe) {

      $pages.$.stop().animate(css, {
        duration: duration,
        complete: _completeCallback
      });

    } else {
      $pages.$.css(css);
      _completeCallback();
    }
  }
}