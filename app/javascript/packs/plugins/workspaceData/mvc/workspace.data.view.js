/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../../modules/View';
import {BasePreferencesElement} from '../../preferences/preferences';
import {WorkspaceDataContentElement} from '../element/workspace.data.content.element';
import {WorkspaceDataAddPageElement} from '../element/workspace.data.add.page.element';
import {WorkspaceDataPreferencesElement} from '../element/workspace.data.preferences.element';

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../lib/extends/aggregation');

/**
 * @class WorkspaceDataView
 * @type {WorkspaceDataView}
 */
export class WorkspaceDataView extends aggregation(BaseView, BasePreferencesElement) {

  /**
   * @constructor
   * @param {string} name
   * @param {WorkspaceData} scope
   */
  constructor(name, scope) {
    super(name || 'WorkspaceDataView', scope, false);
  }

  /**
   * Render WorkspaceData
   * @memberOf WorkspaceDataView
   * @returns {boolean}
   */
  renderWorkspaceData() {

    /**
     * Define WorkspaceData element
     * @type {PanelContentElement}
     */
    this.elements.$workspacedata = this.get$container();
    this.elements.$workspacedata.initSortable();
  }

  /**
   * Render workspace.data content
   * @memberOf WorkspaceDataView
   * @param data
   * @returns {boolean}
   */
  renderContent(data) {
    this.cleanElementItems();
    this.renderCreatePage();
    this.renderFilterElement();

    /**
     * Get current page
     * @type {Page}
     */
    const page = this.controller.getPage();
    const l = data.length;

    for (let i = 0; i < l; i++) {
      if (!data[i]) {
        this.scope.logger.warn('Undefined item', data, i);
        return false;
      }

      /**
       * Show in tabs
       * @type {string}
       */
      const show = this.controller.checkShowInTabs(data[i]) ? '' : ' hide';

      /**
       * Define current page style
       * @type {string}
       */
      const current = page === data[i] ? ' current' : '';

      /**
       * Render item
       * @type {WorkspaceDataContentElement}
       */
      const $item = new WorkspaceDataContentElement(this, {
        style: 'page content' + current + show,
        uuid: [data[i].model.getUUID(), 'workspace-data-view'].join('-'),
        $container: this.get$item().$,
        data: data[i]
      });

      this.updateElementItems($item);
    }

    this.elements.$filter.updateData({
      items: this.elements.items,
      focusOn: 'input'
    });
  }

  /**
   * Render create new page
   * @memberOf WorkspaceDataView
   */
  renderCreatePage() {

    /**
     * Render add new pages
     * @type {WorkspaceDataAddPageElement}
     */
    this.elements.$addPage = new WorkspaceDataAddPageElement(this, {
      style: 'add-page',
      $container: this.get$item().$,
      events: {
        click: ['prepareCreatePage']
      }
    });
  }

  /**
   * Render create page wizard
   * @memberOf WorkspaceDataView
   * @param {{
   *  workspace: Workspace,
   *  style: string,
   *  [type]: string,
   *  title: string,
   *  text: string,
   *  $html
   * }} opts
   */
  renderCreatePageWizard(opts) {

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
          click: 'approveCreatePage'
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
      text: opts.workspace.model.getUUID(),
      html: opts.$html,
      cover: true,
      buttons: buttons
    });
  }

  /**
   * Show preferences
   * @memberOf WorkspaceDataView
   * @param config
   * @param {boolean} current
   */
  showPreferences(config, current) {
    this.openPreferences({
      config: config,
      current: current,
      $html: this.controller.definePreferences(config.uuid).$,
      style: 'workspace-data-prefs preferences',
      title: 'Page preferences',
      buttons: {
        grid: {
          text: 'Grid',
          type: 'warning',
          events: {
            click: 'showPageGrid'
          }
        },
        locate: {
          text: 'Locate',
          type: 'default',
          events: {
            click: 'locatePageElement'
          }
        },
        navigate: {
          text: 'Navigate',
          type: 'warning',
          events: {
            click: 'navigateToPage'
          }
        },
        destroyPageWidgets: {
          text: 'Destroy widgets',
          type: 'danger',
          events: {
            click: 'destroyPageWidgets'
          }
        }
      }
    });
  }

  /**
   * Render Prefs
   * @memberOf WorkspaceDataView
   * @param {Page} page
   * @returns {WorkspaceDataPreferencesElement}
   */
  renderPreferences(page) {

    /**
     * Define WorkspaceData Preferences Element
     * @type {WorkspaceDataPreferencesElement}
     */
    this.elements.$preferences = new WorkspaceDataPreferencesElement(this, {
      data: page.model.getConfig('preferences'),
      page: page
    });

    return this.get$preferences();
  }

  /**
   * Render workspace.data
   * @memberOf WorkspaceDataView
   */
  render() {

    /**
     * @constant scope
     * @type {WorkspaceData}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.successRendered, this.renderWorkspaceData.bind(this));
  }
}
