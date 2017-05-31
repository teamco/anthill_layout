(function () {

    /**
     * Define public loader
     * @returns {boolean}
     * @private
     */
    function _loadPublic() {

        var script = document.getElementById('require-init'),
            dataset = script.dataset || {},
            site = dataset.resource,
            uuid = dataset.uuid,
            version = parseInt(dataset.current || 0, 10) || 1,
            user = dataset.user,
            mode = dataset.mode,
            activated = dataset.activated,
            environment = dataset.environment;

        var main = dataset.config || 'config/main';

        /**
         * Define Setup
         * @returns Application
         * @private
         */
        function _setup() {

            /**
             * Define loaderJs
             * @type {[*]}
             */
            var loaderJs = [

                '_',
                'lz-string',
                'jquery.ujs',
                'jquery.resizestop',
                'jquery.zoomooz',

                'extends/function',
                'extends/json',
                'extends/event',
                'extends/string',
                'extends/array',

                'config/listeners',
                'config/permissions',

                'public/' + site + '/javascript/listeners',
                'public/' + site + '/javascript/permissions'

            ];

            if (mode !== 'consumption') {
                loaderJs.unshift('jquery.ui');
            }

            require(loaderJs, function init() {

                require([
                    'config/application',
                    'public/' + site + '/javascript/config'
                ], function _initApplication(Application, config) {

                    $.extend(true, config, {
                        user: user,
                        uuid: uuid,
                        version: version,
                        activate: activated === 'true',
                        environment: environment,
                        appName: site,
                        mode: mode
                    });

                    /**
                     * Define application
                     * @type {Application}
                     */
                    return new Application({config: config});
                });
            });
        }

        require([main], _setup);
    }

    _loadPublic();

})();
