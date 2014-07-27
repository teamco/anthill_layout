require([

    '../../../scripts/core/config/main'

], function loadConfig() {

    require([
        'public/shared/javascript/listeners',
        'public/shared/javascript/permission'
    ], function loadCustomConfig() {

        require([
            'config/debugger',
            'config/application'
        ], function initDemo(Debugger, Application) {

            /**
             * Define shared application
             * @type {App}
             */
            window.shared = new Application({
                config: {
                    html: {
                        container: 'body'
                    },
                    appName: 'shared',
                    mode: 'development'
                }
            });

            window.shared.view.render();

            if (!window.shared.model.loadData()) {

                var workspace1 = window.shared.api.createWorkspace([], true),
                    page1 = workspace1.api.createPage([], true);
            }
        });
    });
});