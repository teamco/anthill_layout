/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function definePageTabsController(PluginBase, WidgetContentController) {

    /**
     * Define PageTabs controller
     * @class PageTabsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var PageTabsController = function PageTabsController() {

    };

    return PageTabsController.extend('PageTabsController', {

        /**
         * Subscribe to change page title
         * @member PageTabsController
         */
        subscribeChangePageTitleEvent: function subscribeChangePageTitleEvent() {
            this.controller._subscribePageEventCallback.bind(this)(
                'updatePageTitle',
                this.eventmanager.eventList.updatePageTabTitle
            );
        },

        /**
         * Subscribe to after page ordering event
         * @member PageTabsController
         */
        subscribeOrderPagesEvent: function subscribeOrderPagesEvent() {
            this.controller._subscribePageEventCallback.bind(this)(
                'afterPageOrder',
                this.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Subscribe to after switch page event
         * @member PageTabsController
         */
        subscribeAfterSwitchPageEvent: function subscribeAfterSwitchPageEvent() {
            this.controller._subscribePageEventCallback.bind(this)(
                'afterSwitchToPage',
                this.eventmanager.eventList.setActivePageTab
            );
        },

        /**
         * Subscribe to create page event
         * @member PageTabsController
         */
        subscribeCreatePageEvent: function subscribeCreatePageEvent() {
            this.controller._subscribePageEventCallback.bind(this)(
                'afterCreateItem',
                this.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Subscribe to destroy page event
         * @member PageTabsController
         */
        subscribeDestroyPageEvent: function subscribeDestroyPageEvent() {

            this.controller._subscribePageEventCallback.bind(this)(
                'afterDestroyItem',
                this.eventmanager.eventList.setEmbeddedContent
            );

            this.controller._subscribePageEventCallback.bind(this)(
                'afterDestroyItems',
                this.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Subscribe to create page event
         * @member PageTabsController
         * @private
         * @param {string} eventName
         * @param {string} callbackEvent
         */
        _subscribePageEventCallback: function _subscribePageEventCallback(eventName, callbackEvent) {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var ws = this.controller.getWorkspace();

            /**
             * Get workspace
             * @type {WorkspaceEventManager}
             */
            var wsEventManager = ws.eventmanager;

            wsEventManager.subscribe({

                event: {
                    eventName: wsEventManager.eventList[eventName]
                },

                callback: function _callback() {

                    this.observer.publish(callbackEvent);

                }.bind(this)

            }, false);
        },

        /**
         * Set embedded content
         * @member PageTabsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var ws = this.controller.getWorkspace();

            this.view.elements.$pagetabs.renderEmbeddedContent(
                ws.model.getItems()
            );

            this.observer.publish(
                this.eventmanager.eventList.setActivePageTab
            );
        },

        /**
         * Set active tab
         * @member PageTabsController
         */
        setActivePageTab: function setActivePageTab() {
            this.view.elements.$pagetabs.setPageTabAsCurrent(
                this.controller.getPage()
            );
        },

        updatePageTabTitle: function updatePageTabTitle() {
            debugger
        },

        /**
         * Switch to page
         * @member PageTabsController
         * @param {PageTabsItemElement} $page
         * @param {Event} e
         */
        switchToPage: function switchToPage($page, e) {

            if ($page.pageUrl) {

                this.logger.debug('Open url', e);
                window.open($page.pageUrl);

            } else {

                /**
                 * Get workspace
                 * @type {Workspace}
                 */
                var workspace = this.controller.getWorkspace();

                workspace.observer.publish(
                    workspace.eventmanager.eventList.switchToPage,
                    [$page.pageTab, true]
                );
            }
        },

        /**
         * Add PageTabs rule
         * @member PageTabsController
         * @param e
         */
        addPageTabsRule: function addPageTabsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});