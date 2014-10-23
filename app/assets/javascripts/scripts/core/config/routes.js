/**
 * Created with RubyMine.
 * User: teamco
 * Date: 10/23/14
 * Time: 11:23 PM
 */

define([], function defineRoutes(){

    /**
     * Define Routes
     * @class Routes
     * @constructor
     */
    var Routes = function Routes() {
    };

    return Routes.extend('Routes', {

        /**
         * Define route resources
         * @member Routes
         */
        resources: {
            galleryWidgets: '/author/widgets.json'
        }
    });
});