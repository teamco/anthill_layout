define(function defineRaygunIO() {

    /**
     * Define RaygunIO
     * @class RaygunIO
     * @constructor
     */
    var RaygunIO = function RaygunIO() {

        /**
         * Define CDN library path
         * @property RaygunIO
         * @type {string}
         */
        this.path = '//cdn.raygun.io/raygun4js/raygun.min.js';

        /**
         * Define API Key
         * @property RaygunIO
         * @type {string}
         */
        this.apiKey = 'DbFEbP1IlRGv779/A2wo1Q==';
    };

    return RaygunIO.extend('RaygunIO', {

        /**
         * Define init
         * @memberOf RaygunIO
         */
        init: function init() {

            // Get scope
            var scope = this;

            require([this.path], function _loadRaygun() {

                Raygun.init(scope.apiKey).attach();
            });
        }
    });
});