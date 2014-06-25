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
         * Subscribe to create page event
         * @member PageTabsController
         */
        subscribeCreatePageEvent: function subscribeCreatePageEvent() {

            this.controller._subscribePageEventCallback.bind(this)('afterCreateItem');
        },

        /**
         * Subscribe to destroy page event
         * @member PageTabsController
         */
        subscribeDestroyPageEvent: function subscribeDestroyPageEvent() {

            this.controller._subscribePageEventCallback.bind(this)('afterDestroyItem');
        },

        /**
         * Subscribe to create page event
         * @member PageTabsController
         * @private
         * @param {string} eventName
         */
        _subscribePageEventCallback: function _subscribePageEventCallback(eventName) {

            /**
             * Get workspace
             * @type {WorkspaceEventManager}
             */
            var wsEventManager = this.controller.getWorkspace().eventmanager;

            wsEventManager.subscribe({

                event: {
                    eventName: wsEventManager.eventList[eventName]
                },

                callback: function onPageEventCallback() {

                    this.observer.publish(
                        this.eventmanager.eventList.setEmbeddedContent
                    );

                }.bind(this)

            }, false);
        },

        /**
         * Set embedded content
         * @member PageTabsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$pagetabs.renderEmbeddedContent(
                this.controller.getWorkspace().model.getItems()
            );
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

        setAsCurrentPage: function setAsCurrentPage() {

            /**
             * Get workspace
             * @type {Page}
             */
            var page = this.controller.getPage();

            debugger
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