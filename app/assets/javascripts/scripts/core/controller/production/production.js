define([
    'controller/production/keen',
    'controller/production/raygun'
], function defineProduction(KeenIO, RaygunErrors) {

    /**
     * Define Production mode
     * @class Production
     * @constructor
     * @extends BaseController
     * @extends KeenIO
     */
    var Production = function Production() {

        /**
         * Define KeenIO
         * @property Production
         * @type {KeenIO}
         */
        this.keenio = undefined;

        /**
         * Define Raygun
         * @property Production
         * @type {RaygunErrors}
         */
        this.raygunerrors = undefined;
    };

    return Production.extend('Production', {

        /**
         * Define is production checker
         * @memberOf Production
         */
        isProduction: function isProduction() {
            return this.getEnvironment() === 'production';
        },

        /**
         * Define load in production
         * @memberOf Production
         * @param {function} callback
         * @returns {boolean}
         */
        loadInProduction: function loadInProduction(callback) {

            if (this.isProduction()) {
                callback();
            }

            this.scope.logger.debug(
                'Environment are not production type',
                this.getEnvironment(),
                callback
            );

            return false;
        },

        /**
         * Define load production mode
         * @memberOf Production
         */
        loadProduction: function loadProduction() {
            this.controller.loadKeenIO();
            this.controller.loadRaygun();
        },

        /**
         * Define KeenIO loader
         * @memberOf Production
         */
        loadKeenIO: function loadKeenIO() {
            this.loadInProduction(
                this.keenio.init
            );
        },

        /**
         * Define Raygun
         * @memberOf Production
         */
        loadRaygun: function loadRaygun() {
            this.loadInProduction(
                this.raygunerrors.init
            );
        }

    }, KeenIO, RaygunErrors);
});