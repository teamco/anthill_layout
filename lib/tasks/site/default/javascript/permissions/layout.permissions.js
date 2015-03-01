/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:42 PM
 */

define(['config/layout'], function defineLayoutPermissions(Layout) {

    /**
     * Define Layout global permission
     * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
     */
    Layout.prototype.globalPermissions = {
        development: {},
        authorize: {},
        consumption: {},
        test: {}
    };

    return Layout;
});