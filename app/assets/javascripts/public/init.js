(function () {

    var script = document.body.getElementsByTagName('script')[0],
        site = script.getAttribute('data-resource'),
        global = script.getAttribute('data-global'),
        mode = script.getAttribute('data-mode');

    require([

        '../scripts/core/config/main',
        site + '/javascript/listeners',
        site + '/javascript/permission'

    ], function loadConfig() {

        require([
            'config/application'
        ], function init(App) {

            /**
             * Define shared application
             * @type {App}
             */
            var app = new App({
                config: {
                    html: {
                        container: 'body',
                        header: true
                    },
                    appName: site,
                    mode: mode
                }
            });

            if (global === 'true') {
                window[site] = app;
            }
        });
    });

})();