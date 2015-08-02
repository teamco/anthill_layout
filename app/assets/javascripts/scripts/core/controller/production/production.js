define([
    'controller/production/keen'
], function defineProduction(KeenIO) {

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
    };

    return Production.extend('Production', {

        /**
         * Define is production checker
         * @memberOf Production
         */
        isProduction: function isProduction() {
            return this.controller.getEnvironment() === 'production';
        },

        /**
         * Define load production mode
         * @memberOf Production
         */
        loadProduction: function loadProduction() {

            if (!this.controller.isProduction()) {

                this.logger.debug(
                    'Environment are not production type',
                    this.controller.getEnvironment()
                );
                return false;
            }

            this.controller.keenio.init();
        }

    }, KeenIO);
});