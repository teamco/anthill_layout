require([

    '../../../scripts/core/config/main'

], function loadConfig() {

    require([
        'public/shared/javascript/listeners',
        'public/shared/javascript/permission'
    ], function loadCustomConfig() {

        require([
            'config/application'
        ], function initDemo(App) {

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
                    appName: 'shared',
                    mode: 'development'
                }
            });

            app.view.render();

            if (!app.model.loadData()) {

                app.model.setConfig('loading', true);

                app.api.createWorkspace([], true).
                    api.createPage([], true);

                app.model.setConfig('loading', false);
            }
        });
    });
});