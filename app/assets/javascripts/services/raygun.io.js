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
        this.apiKey = '';
    };

    return RaygunIO.extend('RaygunIO', {

        /**
         * Define init
         * @memberOf RaygunIO
         * @param {{apiKey: string}} service
         */
        init: function init(service) {

            // Get scope
            var scope = this;

            this.setApiKey(service.apiKey);

            require([this.path], function _loadRaygun() {
                Raygun.init(scope.getApiKey()).attach();
            });
        },

        /**
         * Define API key getter
         * @memberOf RaygunIO
         * @returns {string}
         */
        getApiKey: function getApiKey() {
            return this.apiKey;
        },

        /**
         * Define API key setter
         * @memberOf RaygunIO
         * @param {string} key
         */
        setApiKey: function setApiKey(key) {

            /**
             * Update API key
             * @property RaygunIO
             */
            this.apiKey = key;
        }
    });
});