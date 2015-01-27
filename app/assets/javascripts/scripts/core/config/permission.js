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
], function definePermissions(App, Workspace, Page, Layout, Widget) {

    // Load permissions
    for (var i = 0, l = arguments.length; i < l; i++) {
        arguments[i].prototype.localPermissions = arguments[i].prototype.localPermissions || {};
    }

    /**
     * Define Application Local permission
     * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
     */
    App.prototype.localPermissions = {
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
     * Define Workspace Local permission
     * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
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
     * Define Page Local permission
     * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
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
     * Define Layout Local permission
     * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
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
     * Define Widget Local permission
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