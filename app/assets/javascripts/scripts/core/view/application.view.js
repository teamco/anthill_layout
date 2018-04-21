/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

  // 'element/application/application.element',
  // 'element/header.element',
  // 'element/footer.element',
  // 'element/application/application.content.element',
  // 'element/export.element'

/**
 * @constant BaseView
 * @type {BaseView}
 */
const BaseView = require('../lib/modules/View.js');

/**
 * @class ApplicationView
 * @extends BaseView
 * @type {ApplicationView}
 */
module.exports = class ApplicationView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super('ApplicationView', scope, false);
  }

  /**
   * Render Application
   * @property ApplicationView
   */
  renderApplication() {

    /**
     * Define $application
     * @type {ApplicationElement}
     */
    this.elements.$application = new ApplicationElement(this, {
      $container: this.getConfigHTML().container,
      mode: this.controller.getMode(),
      id: true
    });

    this.header(Header, this.get$item());
    this.workspaces();
    this.footer(Footer, this.get$item());
  }

  /**
   * Render Workspaces container
   * @property ApplicationView
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
   * @property ApplicationView
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
   * @property ApplicationView
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
        text: this.i18n.t('cancel'),
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
   * @property ApplicationView
   * @param {boolean} [silent]
   */
  render(silent) {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, silent);
  }
};