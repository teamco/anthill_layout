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
         * @memberOf PageTabsController
         */
        subscribeChangePageTitleEvent: function subscribeChangePageTitleEvent() {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var ws = this.controller.getWorkspace(),
                pages = ws.model.getItems(),
                index, page;

            for (index in pages) {

                if (pages.hasOwnProperty(index)) {

                    /**
                     * Get page
                     * @type {Page}
                     */
                    page = pages[index];

                    this.controller._subscribePageEventCallback.bind(this)(
                        'afterUpdatePreferences',
                        this.eventmanager.eventList.setEmbeddedContent,
                        page
                    );
                }
            }
        },

        /**
         * Subscribe to after page ordering event
         * @memberOf PageTabsController
         */
        subscribeOrderPagesEvent: function subscribeOrderPagesEvent() {
            this.controller._subscribePageEventCallback.bind(this)(
                'afterPageOrder',
                this.eventmanager.eventList.setEmbeddedContent,
                this.controller.getWorkspace()
            );
        },

        /**
         * Subscribe to after switch page event
         * @memberOf PageTabsController
         */
        subscribeAfterSwitchPageEvent: function subscribeAfterSwitchPageEvent() {
            this.controller._subscribePageEventCallback.bind(this)(
                'afterSwitchToPage',
                this.eventmanager.eventList.setActivePageTab,
                this.controller.getWorkspace()
            );
        },

        /**
         * Subscribe to create page event
         * @memberOf PageTabsController
         */
        subscribeCreatePageEvent: function subscribeCreatePageEvent() {
            this.controller._subscribePageEventCallback.bind(this)(
                'afterCreateItem',
                this.eventmanager.eventList.setEmbeddedContent,
                this.controller.getWorkspace()
            );
        },

        /**
         * Subscribe to destroy page event
         * @memberOf PageTabsController
         */
        subscribeDestroyPageEvent: function subscribeDestroyPageEvent() {

            this.controller._subscribePageEventCallback.bind(this)(
                'afterDestroyItem',
                this.eventmanager.eventList.setEmbeddedContent,
                this.controller.getWorkspace()
            );

            this.controller._subscribePageEventCallback.bind(this)(
                'afterDestroyItems',
                this.eventmanager.eventList.setEmbeddedContent,
                this.controller.getWorkspace()
            );
        },

        /**
         * Subscribe to create page event
         * @memberOf PageTabsController
         * @private
         * @param {string} eventName
         * @param {string} callbackEvent
         * @param {Workspace|Page} scope
         */
        _subscribePageEventCallback: function _subscribePageEventCallback(eventName, callbackEvent, scope) {

            /**
             * Get workspace
             * @type {WorkspaceEventManager|PageEventManager}
             */
            var eventManager = scope.eventmanager;

            eventManager.subscribe({

                event: {
                    eventName: eventManager.eventList[eventName]
                },

                callback: function _callback() {

                    this.observer.publish(callbackEvent);

                }.bind(this)

            }, false);
        },

        /**
         * Set embedded content
         * @memberOf PageTabsController
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
         * @memberOf PageTabsController
         */
        setActivePageTab: function setActivePageTab() {
            this.view.elements.$pagetabs.setPageTabAsCurrent(
                this.controller.getPage()
            );
        },

        /**
         * Switch to page
         * @memberOf PageTabsController
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
                    workspace.eventmanager.eventList.switchToPage, [
                        $page.pageTab,
                        this.model.getPrefs('pagetabsSwipe')
                    ]
                );
            }
        },

        /**
         * Add PageTabs rule
         * @memberOf PageTabsController
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
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});