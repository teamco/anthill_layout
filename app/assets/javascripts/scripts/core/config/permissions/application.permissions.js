/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:34 PM
 */

define(['config/application'], function defineApplicationPermissions(App) {

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
        development: {},
        authorize: {},
        consumption: {},
        test: {}
    };

    return App;
});