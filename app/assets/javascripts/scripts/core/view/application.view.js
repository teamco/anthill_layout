/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/application/application.element',
    'element/header.element',
    'element/footer.element',
    'element/application/application.content.element',
    'element/export.element'
], function defineApplicationView(BaseView, ApplicationElement, Header, Footer, ApplicationContentElement, ExportElement) {

    /**
     * View
     * @constructor
     * @class ApplicationView
     * @extends BaseView
     */
    var ApplicationView = function ApplicationView() {
    };

    return ApplicationView.extend('ApplicationView', {

        /**
         * Render Application
         * @memberOf ApplicationView
         */
        renderApplication: function renderApplication() {

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
        },

        /**
         * Render Workspaces container
         * @memberOf ApplicationView
         */
        workspaces: function workspaces() {

            /**
             * Define $workspaces
             * @type {ApplicationContentElement}
             */
            this.elements.$workspaces = new ApplicationContentElement(this, {
                $container: this.get$item().$,
                style: 'workspaces'
            });
        },

        /**
         * Render export lin
         * @memberOf ApplicationView
         */
        renderExportLink: function renderExportLink(data) {

            /**
             * Define export element
             * @type {ExportElement}
             */
            this.elements.$export = new ExportElement(this, {
                $container: this.get$item().$,
                style: 'export-url',
                data: data
            });
        },

        /**
         * Handle notification renderer
         * @memberOf ApplicationView
         * @param xhr
         * @param {string} status
         */
        handleNotificationsRenderer: function handleNotificationsRenderer(xhr, status) {

            /**
             * Define buttons
             * @type {*}
             */
            var buttons = {
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
            var responseJSON = xhr.responseJSON;

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
        },

        /**
         * Start rendering
         * @memberOf ApplicationView
         * @param {boolean} [silent]
         */
        render: function render(silent) {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                silent
            );
        }

    }, BaseView.prototype)
});