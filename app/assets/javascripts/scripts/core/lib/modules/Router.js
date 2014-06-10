/**
 * Created by i061485 on 6/10/14.
 */

define([

], function defineRouter(){

    /**
     * Define router
     * class Router
     * @constructor
     */
    var Router = function Router() {

        /**
         * Define routes urls
         * @type {{create: string, update: string}}
         */
        this.routes = {
            create: '/author/sites',
            update: '/author/sites/{id}',
            store: '/author/history/{id}'
        };
    };

    return Router.extend({

    });
});