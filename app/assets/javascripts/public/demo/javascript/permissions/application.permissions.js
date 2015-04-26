/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:34 PM
 */

define(['config/application'], function defineApplicationPermissions(Application) {

    /**
     * Define Application global permission
     * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
     */
    Application.prototype.globalPermissions = {
        development: {},
        authorize: {},
        consumption: {},
        test: {}
    };

    return Application;
});