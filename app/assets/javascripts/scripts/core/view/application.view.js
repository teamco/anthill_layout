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
         * @member ApplicationView
         */
        renderApplication: function renderApplication() {

            /**
             * Define $application
             * @type {ApplicationElement}
             */
            this.elements.$application = new ApplicationElement(this, {
                $container: this.getConfigHTML().container,
                id: this.createUUID(),
                mode: this.controller.getMode()
            });

            this.header(Header, this.elements.$application);

            this.workspaces();

            this.footer(Footer, this.elements.$application);
        },

        /**
         * Render Workspaces container
         * @member ApplicationView
         */
        workspaces: function workspaces() {

            /**
             * Define $workspaces
             * @type {ApplicationContentElement}
             */
            this.elements.$workspaces = new ApplicationContentElement(this, {
                $container: this.elements.$application.$,
                style: 'workspaces'
            });
        },

        /**
         * Render export lin
         * @member ApplicationView
         */
        renderExportLink: function renderExportLink(data) {

            /**
             * Define export element
             * @type {ExportElement}
             */
            this.elements.$export = new ExportElement(this, {
                $container: this.elements.$application.$,
                id: 'export-url',
                data: data
            });
        },

        /**
         * Handle notification renderer
         * @member ApplicationView
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
                buttons: buttons
            });
        },

        /**
         * Start rendering
         * @member ApplicationView
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