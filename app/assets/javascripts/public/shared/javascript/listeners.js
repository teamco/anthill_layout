/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'require',
        'controller/workspace.controller'
    ],

    /**
     * Define overwrites
     * @param require
     * @param {WorkspaceController} WorkspaceController
     */
    function defineListeners(require, WorkspaceController) {

        /**
         * Get WorkspaceController
         * @type {WorkspaceController}
         */
        var wcp = WorkspaceController.prototype;

        /**
         * Create authoring panel
         * @member WorkspaceController
         */
        wcp.createAuthorPanel = function createAuthorPanel() {
            this.logger.debug('Create authoring panel', arguments);
        };

        /**
         * Create tool panel
         * @member WorkspaceController
         */
        wcp.createToolPanel = function createToolPanel() {
            this.logger.debug('Create tool panel', arguments);
        };

        require(
            [
                './listeners/application.listeners',
                './listeners/workspace.listeners',
                './listeners/page.listeners',
                './listeners/layout.listeners',
                './listeners/widget.listeners'
            ],

            /**
             * Define listeners
             * @param {Application} Application
             * @param {Workspace} Workspace
             * @param {Page} Page
             * @param {Layout} Layout
             * @param {Widget} Widget
             */
            function defineRequiredModules(Application, Workspace, Page, Layout, Widget) {

            }
        );
    }
);