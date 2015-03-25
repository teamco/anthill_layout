/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:41 PM
 */

define(['config/page'], function definePagePermissions(Page) {

    /**
     * Define Page global permission
     * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
     */
    Page.prototype.globalPermissions = {
        development: {},
        authorize: {},
        consumption: {},
        test: {}
    };

    return Page;
});