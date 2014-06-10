/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'config/application',
        'config/workspace',
        'config/page',
        'config/layout',
        'config/widget'
    ],

    /**
     * @param {App} Application
     * @param {Workspace} Workspace
     * @param {Page} Page
     * @param {Layout} Layout
     * @param {Widget} Widget
     */
        function defineListeners(Application, Workspace, Page, Layout, Widget) {

        /**
         * Load listeners
         */
        Application.prototype.globalListeners = Application.prototype.globalListeners || {};
        Workspace.prototype.globalListeners = Workspace.prototype.globalListeners || {};
        Page.prototype.globalListeners = Page.prototype.globalListeners || {};
        Layout.prototype.globalListeners = Layout.prototype.globalListeners || {};
        Widget.prototype.globalListeners = Widget.prototype.globalListeners || {};

        /**
         * Define Application Global listeners
         * @member App
         * @type {{successRendered: {name: string, callback: function}}}
         * @type {{createAuthorPanel: {name: string, callback: function}}}
         */
        Application.prototype.globalListeners = {
        };

        /**
         * Define Workspace Global listeners
         * @member Workspace
         * @type {{}}
         */
        Workspace.prototype.globalListeners = {

        };

        /**
         * Define Page Global listeners
         * @member Page
         * @type {{}}
         */
        Page.prototype.globalListeners = {

        };

        /**
         * Define Widget Global listeners
         * @member Widget
         * @type {{}}
         */
        Widget.prototype.globalListeners = {

        };

    }
);