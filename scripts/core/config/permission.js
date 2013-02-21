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

    Application.prototype.globalPermissions = {
        development: {
            activateDebugger: true,
            destroyDebugger: true
        }
    };

    Workspace.prototype.globalPermissions = {
    };

    Page.prototype.globalPermissions = {
    };

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