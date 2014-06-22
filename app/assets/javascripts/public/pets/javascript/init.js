require([

    '../../../scripts/core/config/main'

], function loadConfig() {

    require([
        'public/pets/javascript/listeners',
        'public/pets/javascript/permission'
    ], function loadCustomConfig() {

        require([
            'config/debugger'
        ], function initDebug() {

            require([
                'config/application'
            ], function initDemo(Application) {

                /**
                 * Define route
                 * @type {string}
                 */
                var route = window['route'];

                if (!route) {
                    new Error('Undefined pet', route);
                    return false;
                }

                /**
                 * Define pets application
                 * @type {*}
                 */
                window[route] = new Application({
                    config: {
                        html: {
                            container: 'body'
                        },
                        appName: 'anthill',
                        mode: 'development'
                    }
                });

                window[route].view.render();

                if (!window[route].model.loadData()) {

                    var workspace1 = window[route].api.createWorkspace([], true),
                        page1 = workspace1.api.createPage([], true);
                }
            });
        });
    });
});