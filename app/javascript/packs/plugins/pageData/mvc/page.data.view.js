/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../../modules/View';
import {BasePreferencesElement} from '../../preferences/preferences';
import {PageDataContentElement} from '../element/page.data.content.element';
import {PageDataRulesElement} from '../element/page.data.rules.element';
import {aggregation} from '../../../lib/extends/aggregation';

/**
 * @class PageDataView
 * @type {PageDataView}
 */
export class PageDataView extends aggregation(BaseView, BasePreferencesElement) {

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
     * Define PageData element
     * @type {PanelContentElement}
     */
    this.elements.$pagedata = this.get$container();
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
    this.renderFilterElement();
    this.destroyElementItems();

    for (let index in data) {
      if (data.hasOwnProperty(index)) {

        /**
         * Render item
         * @type {PageDataContentElement}
         */
        const $item = new PageDataContentElement(this, {
          style: 'content',
          uuid: `${this.scope.name.toDash()}-${data[index].model.getConfig('uuid')}`,
          $container: this.get$item().$,
          data: data[index],
          destroy: false
        });

        this.scope.observer.publish(this.scope.eventManager.eventList.storeItem, data[index]);
        this.controller.defineContentReferrer(data[index]);
        this.updateElementItems($item);
      }
    }

    this.elements.$filter.updateData({
      items: this.elements.items,
      focusOn: 'input'
    });
  }

  /**
   * Render Data Rules
   * @method renderDataRules
   * @memberOf PageDataView
   */
  renderDataRules() {

    /**
     * $contentRules
     * @type {PageDataRulesElement}
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

    /**
     * @instance
     * @type {GenerateRules}
     */
    const canvas = this.elements.$contentRules.canvas;

    this.modalDialog({
      style: opts.style,
      type: opts.type || 'info',
      title: opts.title,
      text: opts.page.model.getUUID(),
      html: opts.$html,
      cover: true,
      buttons: buttons,
      callbacks: {
        afterShow: () => {
          import('gojs').then(go => canvas.createDiagram.call(canvas, go));
        }
      }
    });
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
}
