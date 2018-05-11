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
 * @class ApplicationView
 * @extends BaseView
 * @type {module.ApplicationView}
 */
module.exports = class ApplicationView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Application} scope
   */
  constructor(name, scope) {
    super(name || 'ApplicationView', scope, false);
  }

  /**
   * Render Application
   * @memberOf ApplicationView
   */
  renderApplication() {

    /**
     * @constant ApplicationElement
     * @type {module.ApplicationElement|*}
     */
    const ApplicationElement = require('../element/application/application.element.js');

    /**
     * Define $application
     * @type {module.ApplicationElement}
     */
    this.elements.$application = new ApplicationElement(this, {
      $container: this.getConfigHTML().container,
      mode: this.controller.getMode(),
      id: true
    });

    this.footer(this.get$item());
    this.workspaces();
    this.header(this.get$item());
  }

  /**
   * Render Workspaces container
   * @memberOf ApplicationView
   */
  workspaces() {

    /**
     * @constant ApplicationContentElement
     * @type {module.ApplicationContentElement|*}
     */
    const ApplicationContentElement = require('../element/application/application.content.element.js');

    /**
     * Define $workspaces
     * @type {module.ApplicationContentElement}
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
     * @constant ExportElement
     * @type {module.ExportElement}
     */
    const ExportElement = require('../element/export.element.js');

    /**
     * Define export element
     * @type {module.ExportElement}
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
};