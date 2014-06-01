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
         * @param {Page} page
         */
        switchTo: function switchTo(page) {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.getWorkspace();

            workspace.observer.publish(
                workspace.eventmanager.eventList.switchToPage,
                page
            );
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