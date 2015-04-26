/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:39 PM
 */

define(['config/workspace'], function defineWorkspacePermissions(Workspace) {

    /**
     * Define Workspace global permission
     * @type {{
     *      development: {createAuthorPanel: boolean, createToolPanel: boolean},
     *      authorize: {createAuthorPanel: boolean, createToolPanel: boolean},
     *      consumption: {createAuthorPanel: boolean, createToolPanel: boolean},
     *      test: {createAuthorPanel: boolean, createToolPanel: boolean}
     * }}
     */
    Workspace.prototype.globalPermissions = {
        development: {
            createAuthorPanel: true,
            createToolPanel: true
        },
        authorize: {
            createAuthorPanel: true,
            createToolPanel: true
        },
        consumption: {
            createAuthorPanel: false,
            createToolPanel: false
        },
        test: {
            createAuthorPanel: true,
            createToolPanel: true
        }
    };

    return Workspace;
});