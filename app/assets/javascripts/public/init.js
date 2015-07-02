(function () {

    /**
     * Define public loader
     * @returns {boolean}
     * @private
     */
    function _loadPublic() {

        var script = document.getElementById('require-init'),
            site = script.dataset.resource,
            uuid = script.dataset.uuid,
            version = parseInt(script.dataset.version, 10) || 1,
            user = script.dataset.user,
            mode = script.dataset.mode,
            isConsumption = mode === 'consumption';

        /**
         * Define Setup
         * @returns Application
         * @private
         */
        function _setup() {

            require([

                'config/listeners',
                'config/permissions',

                'public/' + site + '/javascript/listeners',
                'public/' + site + '/javascript/permissions'

            ], function init() {

                require([
                    'config/application',
                    'public/' + site + '/javascript/config'
                ], function loadApplication(Application, config) {

                    $.extend(true, config, {
                        user: user,
                        uuid: uuid,
                        version: version,
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

        require(['../scripts/core/config/main'], function defineDelegator() {

            if (isConsumption) {

                _setup();

                return false;
            }

            require([
                'modernizr',
                'lz-string',
                'totally',
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
            ], _setup);
        });
    }

    _loadPublic();

})();