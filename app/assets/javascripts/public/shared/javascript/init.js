require([

    '../../../scripts/core/config/main'

], function loadConfig() {

    require([
        'public/shared/javascript/listeners',
        'public/shared/javascript/permission'
    ], function loadCustomConfig() {

        require([
            'config/application'
            //,'config/debugger'
        ], function initDemo(Application, Debugger) {

            /**
             * Define shared application
             * @type {App}
             */
            window.shared = new Application({
                config: {
                    html: {
                        container: 'body',
                        header: true
                    },
                    appName: 'shared',
                    mode: 'development'
                }
            });

            window.shared.view.render();

            if (!window.shared.model.loadData()) {
                window.shared.api.createWorkspace([], true).
                    api.createPage([], true);
            }
        });
    });
});