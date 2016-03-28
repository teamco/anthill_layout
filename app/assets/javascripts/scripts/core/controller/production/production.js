define(function defineProduction() {

    /**
     * Define Production mode
     * @class Production
     * @constructor
     * @extends BaseController
     */
    var Production = function Production() {
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
         * Define load production mode
         * @memberOf Production
         */
        loadProduction: function loadProduction() {

            var services = this.model.getConfig('services'),
                i = 0, l = services.length, service;

            for (; i < l; i++) {
                this.logger.debug('Load service', services[i]);
                this.controller.loadService(services[i]);
            }
        },

        /**
         * Define service loader
         * @memberOf Production
         * @param {{[path]: string, name: string, load: boolean}} service
         */
        loadService: function loadService(service) {

            /**
             * Define scope
             * @type {Production|string}
             */
            var prod = this,
                path = service.path || 'services/';

            if (!service.load) {
                prod.scope.logger.debug('Skip loading service', service);
                return false;
            }

            require(
                [path + service.name],
                function _loadService(Service) {

                    /**
                     * Define service
                     * @property Production
                     */
                    prod[service.name] = new Service;

                    if (prod.isProduction()) {
                        prod[service.name].init(service);
                        return false;
                    }

                    prod.scope.logger.debug(
                        'Environment are not production type',
                        prod.getEnvironment(),
                        Service
                    );
                }
            );
        }
    });
});