/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseView
 * @type {BaseView}
 */
const BaseView = require('../lib/modules/View.js');

/**
 * @class PageView
 * @extends BaseView
 * @type {module.PageView}
 */
module.exports = class PageView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Page} scope
   */
  constructor(name, scope) {
    super(name || 'PageView', scope, false);
  }

  /**
   * Render Page
   * @memberOf PageView
   */
  renderPage() {

    /**
     * @constant PageElement
     * @type {module.PageElement}
     */
    const PageElement = require('../element/page/page.element.js');

    /**
     * Define page element
     * @type {module.PageElement}
     */
    this.elements.$page = new PageElement(this, {
      $container: this.getContainerSelector()
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
     * @constant DeltaScrollElement
     * @type {module.DeltaScrollElement}
     */
    const DeltaScrollElement = require('../element/page/page.delta.scroll.element.js');

    /**
     * Define delta scroll element
     * @type {module.DeltaScrollElement}
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
     * @constant PageContentElement
     * @type {module.PageContentElement}
     */
    const PageContentElement = require('../element/page/page.content.element.js');

    /**
     * Define widgets container element
     * @type {module.PageContentElement}
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
};
