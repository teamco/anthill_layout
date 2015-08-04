define(function defineRaygun() {

    /**
     * Define RaygunErrors
     * @class RaygunErrors
     * @constructor
     */
    var RaygunErrors = function RaygunErrors() {

        /**
         * Define CDN library path
         * @property RaygunErrors
         * @type {string}
         */
        this.path = '//cdn.raygun.io/raygun4js/raygun.min.js';

        /**
         * Define API Key
         * @property RaygunErrors
         * @type {string}
         */
        this.apiKey = 'DbFEbP1IlRGv779/A2wo1Q==';
    };

    return RaygunErrors.extend('RaygunErrors', {

        /**
         * Define init
         * @memberOf RaygunErrors
         */
        init: function init() {

            require([this.path], function _loadRaygun() {

                Raygun.init(this.apiKey).attach();

            }.bind(this));
        }
    });
});