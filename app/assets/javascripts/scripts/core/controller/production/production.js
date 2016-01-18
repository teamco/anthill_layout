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
         * @param {{[directory]: string, name: string, load: boolean}} service
         */
        loadService: function loadService(service) {

            /**
             * Define scope
             * @type {Production}
             */
            var prod = this,
                path = service.directory || 'controller/production/services/';

            if (service.load) {

                require(
                    [path + service.name],
                    function _loadService(Service) {

                        /**
                         * Define service
                         * @property Production
                         * @type {KeenIO}
                         */
                        prod[service.name] = new Service;

                        if (prod.isProduction()) {
                            prod[service].init();
                            return false;
                        }

                        prod.scope.logger.debug(
                            'Environment are not production type',
                            prod.getEnvironment(),
                            Service
                        );
                    }
                );

            } else {

                prod.scope.logger.debug('Skip loading service', service);
            }
        }
    });
});