define(function defineKeenIO() {

    /**
     * Define KeenIO
     * @class KeenIO
     * @constructor
     */
    var KeenIO = function KeenIO() {

        /**
         * Define KeenIO path
         * @property KeenIO
         * @type {string}
         */
        this.path = 'https://d26b395fwzu5fz.cloudfront.net/3.2.6/keen.min.js';

        /**
         * Define KeenIO project id
         * @property KeenIO
         * @type {string}
         */
        this.projectId = '55be677b90e4bd56516270f3';

        /**
         * Define KeenIO write key
         * @property KeenIO
         * @type {string}
         */
        this.writeKey = '8bf8710ef0c7b28094d372632b40477b33dd99fb6e5bfd9d647426f97e8a755d1f1129128388b804443ca549484fb59502226e6b46b0b51c2650cf7c663b909b7066ac5ec311e5fbeef927e77d2bea2f29c48e2208ede712b898cf1cb8bb5883dace6233f77114b81521c9de76c83139';

        /**
         * Define KeenIO read key
         * @property KeenIO
         * @type {string}
         */
        this.readKey = '561fa3c82daf99eedbc603a7640930fe05f38cb245fd40ee8b16667b78d4acba81e720a6c4267a1ab3207abc026838a8801d9749f34ce732ec766831f13d1c71a565d82790bd6305c6aa2f62971ad99dfeb2be36f205148cbab2cf30f8b682e8a270b938763c83641af08e44215cd55e';
    };

    return KeenIO.extend('KeenIO', {

        /**
         * Define init
         * @memberOf KeenIO
         */
        init: function init() {

            require([this.path], function _loadKeenIO() {

                /**
                 * Define Keen instance
                 * @type {Keen}
                 */
                var client = new Keen({
                    projectId: this.projectId, // String (required always)
                    writeKey: this.writeKey,   // String (required for sending data)
                    readKey: this.readKey,      // String (required for querying data)
                    protocol: 'auto',
                    requestType: 'xhr'
                });

            }.bind(this));
        }
    });
});