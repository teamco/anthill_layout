require([

    '../../../scripts/core/config/main'

], function loadConfig() {

    require([
        'public/demo/javascript/listeners',
        'public/demo/javascript/permission'
    ], function loadCustomConfig() {

        require([
            'config/debugger'
        ], function initDebug() {

            require([
                'config/application'
            ], function initDemo(Application) {

                /**
                 * Define demo application
                 * @type {*}
                 */
                window.demo = new Application({
                    config: {
                        html: {
                            container: 'body'
                        },
                        appName: 'athletics_catalog'
                    }
                });

                window.demo.view.render();

                if (!window.demo.model.loadData()) {

                    var workspace1 = window.demo.api.createWorkspace([], true),
                        page1 = workspace1.api.createPage([], true);
                }
            });
        });
    });
});