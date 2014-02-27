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
     * @type {{
     *      development: {activateDebugger: boolean, destroyDebugger: boolean},
     *      authorize: {activateDebugger: boolean, destroyDebugger: boolean},
     *      consumption: {activateDebugger: boolean, destroyDebugger: boolean},
     *      test: {activateDebugger: boolean, destroyDebugger: boolean}
     * }}
     */
    Application.prototype.localPermissions = {
        development: {
            activateDebugger: false,
            destroyDebugger: false
        },
        authorize: {
            activateDebugger: false,
            destroyDebugger: false
        },
        consumption: {
            activateDebugger: false,
            destroyDebugger: false
        },
        test: {
            activateDebugger: false,
            destroyDebugger: false
        }
    };

    /**
     * Define Workspace Global permission
     * @type {{}}
     */
    Workspace.prototype.localPermissions = {
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
     * @type {{}}
     */
    Page.prototype.localPermissions = {
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
     * @type {{}}
     */
    Template.prototype.localPermissions = {
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
     * @type {{}}
     */
    Layout.prototype.localPermissions = {
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
     * @type {{
     *      development: {draggable: boolean, resizable: boolean},
     *      authorize: {draggable: boolean, resizable: boolean},
     *      consumption: {draggable: boolean, resizable: boolean},
     *      test: {draggable: boolean, resizable: boolean}
     * }}
     */
    Widget.prototype.localPermissions = {
        development: {
            draggable: true,
            resizable: true
        },
        authorize: {
            draggable: true,
            resizable: true
        },
        consumption: {
            draggable: false,
            resizable: false
        },
        test: {
            draggable: true,
            resizable: true
        }
    };

});