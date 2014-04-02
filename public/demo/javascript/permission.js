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
    'config/template',
    'config/layout',
    'config/widget'
], function definePermissions(Application, Workspace, Page, Template, Layout, Widget) {

    /**
     * Define Application Global permission
     * @member App
     * @type {*}
     */
    Application.prototype.globalPermissions = {
        development: {
            activateDebugger: false,
            deactivateDebugger: true
        },
        authorize: {
        },
        consumption: {
        },
        test: {
        }
    };

    /**
     * Define Workspace Global permission
     * @member Workspace
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
     * @member Page
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
     * Define Template Global permission
     * @member Template
     * @type {{}}
     */
    Template.prototype.globalPermissions = {
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
     * @member Layout
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
     * @member Widget
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