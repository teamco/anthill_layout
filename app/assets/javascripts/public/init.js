(function () {

    var script = document.getElementById('require-init'),
        site = script.getAttribute('data-resource'),
        uuid = script.getAttribute('data-uuid'),
        version = parseInt(script.getAttribute('data-version'), 10) || 1,
        mode = script.getAttribute('data-mode');

    require(['../scripts/core/config/main'], function loadConfig() {

        require([
            'public/' + site + '/javascript/listeners',
            'public/' + site + '/javascript/permission'
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
                        uuid: uuid,
                        version: version,
                        appName: site,
                        mode: mode
                    }
                });
            });
        });
    });
})();