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
    'config/widget'
], function definePermissions(Application, Workspace, Page, Widget) {

    /**
     * Define Application Global permission
     * @type {{development: {activateDebugger: boolean, destroyDebugger: boolean}}}
     */
    Application.prototype.globalPermissions = {
        development: {
            activateDebugger: true,
            destroyDebugger: true
        }
    };

    /**
     * Define Workspace Global permission
     * @type {{}}
     */
    Workspace.prototype.globalPermissions = {
    };

    /**
     * Define Page Global permission
     * @type {{}}
     */
    Page.prototype.globalPermissions = {
    };

    /**
     * Define Widget Global permission
     * @type {{
     *  development: {draggable: boolean, resizable: boolean},
     *  authorize: {draggable: boolean, resizable: boolean},
     *  consumption: {draggable: boolean, resizable: boolean}
     * }}
     */
    Widget.prototype.globalPermissions = {
        development: {
            draggable: true,
            resizable: true
        },
        authorize: {
            draggable: true,
            resizable: true
        },
        consumption: {
            draggable: true,
            resizable: true
        }
    };

});