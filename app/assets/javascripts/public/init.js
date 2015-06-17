(function () {

    /**
     * Define public loader
     * @returns {boolean}
     * @private
     */
    function _loadPublic() {

        var script = document.getElementById('require-init'),
            site = script.getAttribute('data-resource'),
            uuid = script.getAttribute('data-uuid'),
            version = parseInt(script.getAttribute('data-version'), 10) || 1,
            user = script.getAttribute('data-user'),
            mode = script.getAttribute('data-mode'),
            isConsumption = mode === 'consumption';

        var main = isConsumption ?
            '../target/main' :
            '../scripts/core/config/main';

        /**
         * Define Setup
         * @returns Application
         * @private
         */
        function _setup() {

            require([
                'config/application'
            ], function init(Application) {

                /**
                 * Define application
                 * @type {Application}
                 */
                return new Application({
                    config: {
                        html: {
                            container: 'body',
                            header: true
                        },
                        user: user,
                        uuid: uuid,
                        version: version,
                        appName: site,
                        mode: mode
                    }
                });
            });
        }

        require([main], function defineDelegator() {

            if (isConsumption) {

                _setup();

                return false;
            }

            require([
                'modernizr',
                'lz-string',
                'jquery',
                'jquery.ui',
                'jquery.ujs',
                'jquery.resizestop',
                'jquery.pseudo',
                'jquery.zoomooz',
                'extends/function',
                'extends/json',
                'extends/event',
                'extends/string',
                'extends/array'
            ], function loadInit() {

                require([

                    'config/listeners',
                    'config/permissions',

                    'public/' + site + '/javascript/listeners',
                    'public/' + site + '/javascript/permissions'

                ], _setup);
            });
        });
    }

    _loadPublic();

})();