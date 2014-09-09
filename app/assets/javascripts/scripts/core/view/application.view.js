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
    'element/export.element',
    'element/application/application.debug.element'
], function defineApplicationView(BaseView, AppHTML, Header, Footer, AppContentElement, ExportElement, DebuggerElement) {

    /**
     * View
     * @constructor
     * @class AppView
     * @extends BaseView
     */
    var AppView = function AppView() {
    };

    return AppView.extend('AppView', {

        /**
         * Render Application
         * @member AppView
         */
        renderApplication: function renderApplication() {

            /**
             * Define $application
             * @type {AppElement}
             */
            this.elements.$app = new AppHTML(this, {
                $container: this.getConfigHTML().container,
                id: this.createUUID(),
                mode: this.controller.getMode()
            });

            this.header(Header, this.elements.$app);

            this.workspaces();

            this.footer(Footer, this.elements.$app);
        },

        /**
         * Render Workspaces container
         * @member AppView
         */
        workspaces: function workspaces() {

            /**
             * Define $workspaces
             * @type {AppContentElement}
             */
            this.elements.$workspaces = new AppContentElement(this, {
                $container: this.elements.$app.$,
                style: 'workspaces'
            });
        },

        /**
         * Render export link
         * @member AppView
         */
        renderExportLink: function renderExportLink(data) {

            /**
             * Define export element
             * @type {ExportElement}
             */
            this.elements.$export = new ExportElement(this, {
                $container: this.elements.$app.$,
                id: 'export-url',
                data: data
            });
        },

        /**
         * Render Debugger window
         * @member AppView
         */
        debug: function debug() {

            /**
             * Define $debugger
             * @type {DebuggerElement}
             */
            this.elements.$debugger = new DebuggerElement(this, {
                $container: this.elements.$app.$,
                style: 'debugger',
                opacity: 0.6,
                events: {
                    click: 'activateDebugger'
                }
            });
        },

        /**
         * Start rendering
         * @member AppView
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