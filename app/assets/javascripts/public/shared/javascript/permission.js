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

    /**
     * Define Application Global permission
     * @memberOf App
     * @type {*}
     */
    Application.prototype.globalPermissions = {
        development: {
            activateDebugger: true,
            deactivateDebugger: true,
            createAuthorPanel: true,
            createToolPanel: true
        },
        authorize: {
        },
        consumption: {
            createAuthorPanel: false
        },
        test: {
        }
    };

    /**
     * Define Workspace Global permission
     * @memberOf Workspace
     * @type {{}}
     */
    Workspace.prototype.globalPermissions = {
        development: {
        },
        authorize: {
        },
        consumption: {
        },
        test: {
        }
    };

    /**
     * Define Page Global permission
     * @memberOf Page
     * @type {{}}
     */
    Page.prototype.globalPermissions = {
        development: {
        },
        authorize: {
        },
        consumption: {
        },
        test: {
        }
    };

    /**
     * Define Layout Global permission
     * @memberOf Layout
     * @type {{}}
     */
    Layout.prototype.globalPermissions = {
        development: {
        },
        authorize: {
        },
        consumption: {
        },
        test: {
        }
    };

    /**
     * Define Widget Global permission
     * @memberOf Widget
     * @type {{}}
     */
    Widget.prototype.globalPermissions = {
        development: {
        },
        authorize: {
        },
        consumption: {
        },
        test: {
        }

    };

});