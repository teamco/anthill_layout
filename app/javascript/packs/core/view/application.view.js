/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../modules/View';
import {ApplicationElement} from '../element/application/application.element';
import {ApplicationContentElement} from '../element/application/application.content.element';
import {ExportElement} from '../element/export.element';

/**
 * @class ApplicationView
 * @extends BaseView
 * @type {ApplicationView}
 */
export class ApplicationView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Application} scope
   */
  constructor(name, scope) {
    super(name || 'ApplicationView', scope);
  }

  /**
   * Render Application
   * @memberOf ApplicationView
   */
  renderApplication() {

    /**
     * Define container
     * @constant
     * @type {string}
     */
    const container = this.getConfigHTML().container;
    if (!container) {
      this.scope.logger.warn('Undefined container. Use <body /> as a default');
    }

    /**
     * Define $application
     * @type {ApplicationElement}
     */
    this.elements.$application = new ApplicationElement(this, {
      $container: container || 'body',
      mode: this.controller.getMode(),
      id: true
    });

    this.header(this.get$item());
    this.workspaces();
    this.footer(this.get$item());
  }

  /**
   * Render Workspaces container
   * @memberOf ApplicationView
   */
  workspaces() {

    /**
     * Define $workspaces
     * @type {ApplicationContentElement}
     */
    this.elements.$workspaces = new ApplicationContentElement(this, {
      $container: this.get$item().$,
      style: 'workspaces'
    });
  }

  /**
   * Render export lin
   * @memberOf ApplicationView
   */
  renderExportLink(data) {

    /**
     * Define export element
     * @type {ExportElement}
     */
    this.elements.$export = new ExportElement(this, {
      $container: this.get$item().$,
      style: 'export-url',
      data: data
    });
  }

  /**
   * Handle notification renderer
   * @memberOf ApplicationView
   * @param xhr
   * @param {string} status
   */
  handleNotificationsRenderer(xhr, status) {

    /**
     * Define buttons
     * @type {*}
     */
    const buttons = {
      reject: {
        text: this.scope.i18n.t('cancel'),
        events: {
          click: 'rejectModalEvent'
        }
      }
    };

    /**
     * Define responseJSON
     * @type {Ajax.Response.responseJSON|*}
     */
    const responseJSON = xhr.responseJSON;

    this.modalDialog({
      style: 'handle-' + status,
      type: status,
      title: xhr.status,
      text: xhr.statusText,
      html: (responseJSON || {}).error,
      cover: true,
      autoclose: status === 'danger',
      buttons: buttons
    });

    this.controller.handleSendLog(xhr, status);
  }

  /**
   * Start rendering
   * @memberOf ApplicationView
   * @param {boolean} [silent]
   */
  render(silent) {
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.successRendered, silent);
  }
}