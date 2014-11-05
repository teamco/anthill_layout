/**
 * Created with RubyMine.
 * User: teamco
 * Date: 10/23/14
 * Time: 11:23 PM
 */

define([], function defineRoutes() {

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
         * @type {object}
         */
        resources: {},

        /**
         * Define route setter
         * @member Routes
         * @param {string} route
         * @param {[string, string]} data
         */
        setRoute: function setRoute(route, data) {

            /**
             * Define route
             * @member Routes
             * @type {string|string[]}
             */
            this.resources[route] = data;
        },

        /**
         * Prepare XHR data before send
         * @member Routes
         * @param {object} collector
         * @returns {{authenticity_token: (*|jQuery)}}
         */
        prepareXhrData: function prepareXhrData(collector) {

            /**
             * Define token
             * @type {{authenticity_token: (*|jQuery)}}
             */
            var data = {
                authenticity_token: $('meta[name="csrf-token"]').attr('content')
            }, index;

            for (index in collector) {
                if (collector.hasOwnProperty(index)) {
                    if (data.hasOwnProperty(index)) {
                        throw new Error('Duplicate params', index);
                    } else {
                        data[index] = collector[index];
                    }
                }
            }

            return data;
        }
    });
});