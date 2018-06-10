/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../core/lib/extends/aggregation.js');

/**
 * @constant BaseView
 * @type {BaseView}
 */
const BaseView = require('../../../core/lib/modules/View.js');

/**
 * @constant BasePreferencesElement
 * @type {module.BasePreferencesElement}
 */
const BasePreferencesElement = require('../../preferences/preferences.js');

/**
 * @class PageDataView
 * @type {module.PageDataView}
 */
module.exports = class PageDataView extends aggregation(BaseView, BasePreferencesElement) {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'PageDataView', scope, false);
  }

  /**
   * Render PageData
   * @memberOf PageDataView
   * @returns {boolean}
   */
  renderPageData() {

    /**
     * @constant PageDataElement
     * @type {module.PageDataElement|*}
     */
    const PageDataElement = require('../element/page.data.element.js');

    if (this.isCached('$pagedata', PageDataElement)) {
      return false;
    }

    /**
     * Define PageData element
     * @type {module.PageDataElement}
     */
    this.elements.$pagedata = new PageDataElement(this, {
      uuid: this.createUUID(),
      $container: this.get$container().$
    });
  }

  /**
   * Render page.data content
   * @memberOf PageDataView
   * @param data
   * @returns {boolean}
   */
  renderContent(data) {
    this.cleanElementItems();
    this.renderDataRules();

    this.renderFilterElement(this.updateFooterContent.bind(this));

    /**
     * @constant PageDataContentElement
     * @type {module.PageDataContentElement|*}
     */
    const PageDataContentElement = require('../element/page.data.content.element.js');

    for (let index in data) {
      if (data.hasOwnProperty(index)) {

        /**
         * Render item
         * @type {module.PageDataContentElement}
         */
        const $item = new PageDataContentElement(this, {
          style: 'content',
          uuid: [data[index].model.getConfig('uuid'), this.scope.name.toDash()].join('-'),
          $container: this.get$item().$,
          data: data[index]
        });

        this.scope.observer.publish(this.scope.eventManager.eventList.storeItem, data[index]);
        this.controller.defineContentReferrer(data[index]);
        this.updateElementItems($item);
      }
    }

    this.updateScrollCover();

    this.elements.$filter.updateData({
      items: this.elements.items,
      focusOn: 'input'
    });

    this.updateFooterContent();
  }

  /**
   * Render Data Rules
   * @method renderDataRules
   * @memberOf PageDataView
   */
  renderDataRules() {

    /**
     * @constant PageDataRulesElement
     * @type {module.PageDataRulesElement|*}
     */
    const PageDataRulesElement = require('../element/page.data.rules.element.js');

    /**
     * $contentRules
     * @type {module.PageDataRulesElement}
     */
    this.elements.$contentRules = new PageDataRulesElement(this, {
      $container: this.get$item().$,
      events: {
        click: ['prepareShowContentRules']
      }
    });
  }

  /**
   * Render page content rules wizard
   * @method renderPageContentRulesWizard
   * @memberOf PageDataView
   * @param {{
   *  page: Page,
   *  style: string,
   *  [type]: string,
   *  title: string,
   *  text: string,
   *  $html
   * }} opts
   */
  renderPageContentRulesWizard(opts) {

    /**
     * Define buttons
     * @type {{
     *  approve: {text: string, events: {click: string}},
     *  reject: {text: string, events: {click: string[]}}
     * }}
     */
    const buttons = {
      approve: {
        text: 'OK',
        type: 'success',
        events: {
          click: 'approveEditRules'
        }
      },
      reject: {
        text: 'Cancel',
        events: {
          click: ['rejectModalEvent']
        }
      }
    };

    this.modalDialog({
      style: opts.style,
      type: opts.type || 'info',
      title: opts.title,
      text: opts.page.model.getUUID(),
      html: opts.$html,
      cover: true,
      buttons: buttons
    });
  }

  /**
   * Update footer content
   * @memberOf PageDataView
   */
  updateFooterContent() {
    this.renderFooter(this.get$item());
  }

  /**
   * Show preferences
   * @memberOf PageDataView
   * @param config
   * @param {boolean} load
   */
  showPageDataModal(config, load) {

    /**
     * Define scope
     * @type {PageData|{name}}
     */
    const scope = this.scope;

    /**
     * Get content
     * @type {WidgetContent|{view}}
     */
    const content = scope.activeContent;

    if (!content || !load) {
      scope.logger.warn('Undefined content');
      return false;
    }

    /**
     * Define $html
     * @type {PluginElement}
     */
    const $html = content.view.renderPreferences(this);

    this.openPreferences({
      config: config,
      $html: $html.$,
      style: [config.preferences.resource.toClassName(), 'widget-prefs preferences'].join(' '),
      title: 'Widget preferences',
      buttons: {
        content: {
          text: 'Show content',
          type: 'success',
          events: {
            click: 'showWidgetContent'
          }
        },
        remove: {
          text: 'Remove',
          type: 'danger',
          events: {
            click: 'removeWidget'
          }
        },
        rules: {
          text: 'Rules',
          type: 'info',
          events: {
            click: 'rules' + scope.name
          }
        },
        reject: {
          text: 'Cancel',
          events: {
            click: [
              'rejectModalEvent',
              'restoreWidgetsLayerIndex',
              'restoreWidgetSticker'
            ]
          }
        }
      }
    });
  }

  /**
   * Render page.data
   * @memberOf PageDataView
   */
  render() {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, this.renderPageData.bind(this));
  }
};
