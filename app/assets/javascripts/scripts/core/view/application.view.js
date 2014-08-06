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
    'element/application/application.element.content',
    'element/application/application.element.debug'
], function defineApplicationView(BaseView, AppHTML, Header, Footer, AppContent, DebuggerElement) {

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
             * @type {AppContent}
             */
            this.elements.$workspaces = new AppContent(this, {
                $container: this.elements.$app.$,
                style: 'workspaces'
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