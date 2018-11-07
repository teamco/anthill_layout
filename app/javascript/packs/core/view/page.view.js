/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../modules/View';
import {PageElement} from '../element/page/page.element';
import {DeltaScrollElement} from '../element/page/page.delta.scroll.element';
import {PageContentElement} from '../element/page/page.content.element';

/**
 * @class PageView
 * @extends BaseView
 * @type {PageView}
 */
export class PageView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Page} scope
   */
  constructor(name, scope) {
    super(name || 'PageView', scope);
  }

  /**
   * Render Page
   * @memberOf PageView
   */
  renderPage() {

    /**
     * Define page element
     * @type {PageElement}
     */
    this.elements.$page = new PageElement(this, {
      $container: this.getContainerSelector(),
      destroy: false
    });

    this.header(this.get$item());
    this.widgets();

    if (!this.controller.isConsumptionMode()) {
      this.deltaScroll();
    }

    this.footer(this.get$item());

    /**
     * Get workspace
     * @type {Workspace|{observer, eventManager}}
     */
    const containment = this.controller.getContainment();
    containment.observer.publish(containment.eventManager.eventList.adoptContentWidth);
  }

  /**
   * Define delta scroll
   * @memberOf PageView
   */
  deltaScroll() {

    /**
     * Define delta scroll element
     * @type {DeltaScrollElement}
     */
    this.elements.$deltaScroll = new DeltaScrollElement(this, {
      $container: this.get$item().$,
      style: 'delta-scroll'
    });
  }

  /**
   * Define widgets container
   * @memberOf PageView
   */
  widgets() {

    /**
     * Define widgets container element
     * @type {PageContentElement}
     */
    this.elements.$widgets = new PageContentElement(this, {
      style: 'widgets',
      $container: this.get$item().$
    });
  }

  /**
   * Show destroy widgets confirmation modal dialog
   * @memberOf PageView
   */
  destroyWidgetsModalDialog(widgets) {
    this.modalDialog({
      style: this.scope.name.toLowerCase() + '-modal',
      items: widgets,
      type: 'warning',
      title: 'Remove widgets',
      html: [
        '<p>Are you sure want to destroy:</p>',
        this.get$item().getItemsList(widgets)
      ].join(''),
      cover: true,
      autoclose: true,
      buttons: {
        approve: {
          text: 'OK',
          type: 'success',
          events: {
            click: 'approveItemsDestroy'
          }
        },
        reject: {
          text: 'Cancel',
          events: {
            click: 'rejectModalEvent'
          }
        }
      }
    });
  }

  /**
   * Render page
   * @memberOf PageView
   * @param {boolean} silent
   */
  render(silent) {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, silent);
  }
}
