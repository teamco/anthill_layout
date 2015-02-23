/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:41 PM
 */

define(['config/page'], function definePagePermissions(Page) {

    /**
     * Define Page Local permission
     * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
     */
    Page.prototype.localPermissions = {
        development: {},
        authorize: {},
        consumption: {},
        test: {}
    };

    return Page;
});