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
     * @type {*}
     */
    Application.prototype.globalPermissions = {
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
     * Define Workspace Global permission
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
     * @type {{
     *      development: {draggable: boolean, resizable: boolean},
     *      authorize: {draggable: boolean, resizable: boolean},
     *      consumption: {draggable: boolean, resizable: boolean},
     *      test: {draggable: boolean, resizable: boolean}
     * }}
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