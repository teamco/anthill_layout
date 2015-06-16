(function () {

    var debug = '../scripts/core/config/main',
        build = '../target/main';

    require([debug], function defineDelegator() {

        var script = document.getElementById('require-init'),
            site = script.getAttribute('data-resource'),
            uuid = script.getAttribute('data-uuid'),
            version = parseInt(script.getAttribute('data-version'), 10) || 1,
            user = script.getAttribute('data-user'),
            mode = script.getAttribute('data-mode');

        require([
            'modernizr',
            'lz-string',
            'jquery',
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

            ], function loadGlobals() {

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
            });
        });
    });
})();