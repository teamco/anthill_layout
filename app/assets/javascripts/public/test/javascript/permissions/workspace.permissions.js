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
     *      development: {createDesignTimePanel: boolean, createRunTimePanel: boolean},
     *      authorize: {createDesignTimePanel: boolean, createRunTimePanel: boolean},
     *      consumption: {createDesignTimePanel: boolean, createRunTimePanel: boolean},
     *      test: {createDesignTimePanel: boolean, createRunTimePanel: boolean}
     * }}
     */
    Workspace.prototype.globalPermissions = {
        development: {
            createDesignTimePanel: true,
            createRunTimePanel: true
        },
        authorize: {
            createDesignTimePanel: true,
            createRunTimePanel: true
        },
        consumption: {
            createDesignTimePanel: false,
            createRunTimePanel: false
        },
        test: {
            createDesignTimePanel: true,
            createRunTimePanel: true
        }
    };

    return Workspace;
});