/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/application',
    'config/workspace',
    'config/page',
    'config/layout',
    'config/widget'
], function definePermissions(Application, Workspace, Page, Layout, Widget) {

    // Define global permissions
    for (var i = 0, l = arguments.length; i < l; i++) {
        arguments[i].prototype.globalPermissions = arguments[i].prototype.globalPermissions || {};
    }

    /**
     * Define Application Global permission
     * @member Application
     * @type {*}
     */
    Application.prototype.globalPermissions = {
        development: {
        },
        authorize: {
        },
        consumption: {
        },
        test: {}
    };

    /**
     * Define Workspace Global permission
     * @member Workspace
     * @type {{}}
     */
    Workspace.prototype.globalPermissions = {
        development: {
            createAuthorPanel: true,
            createToolPanel: true
        },
        authorize: {},
        consumption: {
            createAuthorPanel: false,
            createToolPanel: false
        },
        test: {}
    };

    /**
     * Define Page Global permission
     * @member Page
     * @type {{}}
     */
    Page.prototype.globalPermissions = {
        development: {},
        authorize: {},
        consumption: {},
        test: {}
    };

    /**
     * Define Layout Global permission
     * @member Layout
     * @type {{}}
     */
    Layout.prototype.globalPermissions = {
        development: {},
        authorize: {},
        consumption: {},
        test: {}
    };

    /**
     * Define Widget Global permission
     * @member Widget
     * @type {{
     *      development: {maximizable: boolean, draggable: boolean, resizable: boolean},
     *      authorize: {maximizable: boolean, draggable: boolean, resizable: boolean},
     *      consumption: {maximizable: boolean, draggable: boolean, resizable: boolean},
     *      test: {maximizable: boolean, draggable: boolean, resizable: boolean}
     * }}
     */
    Widget.prototype.globalPermissions = {
        development: {
            maximizable: true,
            draggable: true,
            resizable: true
        },
        authorize: {
            maximizable: true,
            draggable: true,
            resizable: true
        },
        consumption: {
            maximizable: true,
            draggable: false,
            resizable: false
        },
        test: {
            maximizable: true,
            draggable: true,
            resizable: true
        }
    };
});