/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/permissions/application.permissions',
    'config/permissions/workspace.permissions',
    'config/permissions/page.permissions',
    'config/permissions/layout.permissions',
    'config/permissions/widget.permissions',
    'modules/Logger'
], function definePermissions(Application, Workspace, Page, Layout, Widget, Logger) {

    /**
     * Define logger instance
     * @type {Logger}
     */
    var logger = new Logger({
        config: {
            logger: {
                show: true,
                namespaces: false,
                type: {
                    debug: false,
                    log: false,
                    info: false,
                    error: true,
                    warn: true
                }
            }
        }
    });

    logger.puts.bind(logger, 'debug')(
        'Define local permissions', [
            Application.prototype.localPermissions,
            Workspace.prototype.localPermissions,
            Page.prototype.localPermissions,
            Layout.prototype.localPermissions,
            Widget.prototype.localPermissions
        ]
    );
});