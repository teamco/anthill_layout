/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'modules/Controller',
        'modules/Preferences',
        'modules/Router',
        'controller/workspace/workspace.page',
        'controller/workspace/workspace.seo',
        'controller/workspace/workspace.services'
    ],

    /**
     * Define WorkspaceController
     * @param {BaseController} BaseController
     * @param {BasePreferences} BasePreferences
     * @param {Router} Router
     * @param {WorkspacePage} WorkspacePage
     * @param {WorkspaceSEO} WorkspaceSEO
     * @param {WorkspaceServices} WorkspaceServices
     * @returns {*}
     */
    function defineWorkspaceController(BaseController, BasePreferences, Router, WorkspacePage, WorkspaceSEO, WorkspaceServices) {

        /**
         * Define workspace controller
         * @class WorkspaceController
         * @extends BaseController
         * @extends BasePreferences
         * @extends Router
         * @extends WorkspacePage
         * @extends WorkspaceSEO
         * @extends WorkspaceServices
         * @constructor
         */
        var WorkspaceController = function WorkspaceController() {
        };

        return WorkspaceController.extend(
            'WorkspaceController', {

                /**
                 * Set page height
                 * @memberOf WorkspaceController
                 */
                bindHashChange: function bindHashChange() {

                    /**
                     * Get controller
                     * @type {WorkspaceController}
                     */
                    var controller = this.controller;

                    $(window).on(
                        'hashchange',
                        controller.switchPageOnHashChange.bind(controller)
                    );
                },

                /**
                 * Adopt content width after adding new page
                 * @memberOf WorkspaceController
                 */
                adoptContentWidth: function adoptContentWidth() {

                    this.view.elements.$pages.adoptPagesWidth(
                        this.model.getItems(),
                        this.model.getConfig('page/counter')
                    );
                },

                /**
                 * Transfer preferences
                 * @memberOf WorkspaceController
                 * @param {string} index
                 * @param value
                 */
                transferContentPreferences: function transferContentPreferences(index, value) {

                    this.observer.publish(
                        this.eventmanager.eventList.transferPreferences,
                        [index, value]
                    );
                },

                /**
                 * Update site width
                 * @memberOf WorkspaceController
                 */
                updateSiteWidth: function updateSiteWidth() {

                    /**
                     * Define element
                     * @type {WorkspaceElement}
                     */
                    var $workspace = this.view.get$item();

                    var preferences = this.model.getConfig('preferences'),
                        width = 0;

                    if (preferences.staticWidth) {

                        // Get site widths
                        width = parseInt(preferences.siteWidthSlider, 10) || width;
                        $workspace.updateWidth(width);

                    } else {

                        $workspace.unsetWidth();
                    }
                }
            },

            BaseController.prototype,
            BasePreferences.prototype,
            Router.prototype,
            WorkspacePage.prototype,
            WorkspaceSEO.prototype,
            WorkspaceServices.prototype
        );
    }
);