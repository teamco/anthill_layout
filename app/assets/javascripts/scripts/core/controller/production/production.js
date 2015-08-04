define([
    'controller/production/keen',
    'controller/production/raygun'
], function defineProduction(KeenIO, RaygunIO) {

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
         * @type {RaygunIO}
         */
        this.raygunio = undefined;
    };

    return Production.extend('Production', {

        /**
         * Define is production checker
         * @memberOf Production
         */
        isProduction: function isProduction() {

            // TODO until production
            return window.location.hostname !== 'localhost' ||
                this.getEnvironment() === 'production';
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

            var services = this.model.getConfig('services'),
                index, service;

            for (index in services) {

                if (services.hasOwnProperty(index)) {

                    if (services[index]) {

                        this.logger.debug('Load service', index);

                        /**
                         * Fetch service
                         * @memberOf Production
                         */
                        service = this.controller['load' + index];

                        typeof (service) === 'function' ?
                            service.bind(this.controller)() :
                            this.logger.warn('Unable to load service', index);

                    } else {

                        this.logger.debug('Skip service', index);
                    }
                }
            }
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
        loadRaygunIO: function loadRaygunIO() {
            this.loadInProduction(
                this.raygunio.init
            );
        }

    }, KeenIO, RaygunIO);
});