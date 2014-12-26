require([

    '../../../scripts/core/config/main'

], function loadConfig() {

    require([
        'public/shared/javascript/listeners',
        'public/shared/javascript/permission'
    ], function loadCustomConfig() {

        require([
            'config/application'
        ], function initDemo(Application) {

            // Get opts from server side
            var opts = app_opts;

            /**
             * Define application instance
             * @type {App}
             */
            window[opts.name] = new Application({
                config: {
                    html: {
                        container: opts.container,
                        header: opts.header,
                        footer: opts.footer
                    },
                    appName: opts.name,
                    mode: opts.mode
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