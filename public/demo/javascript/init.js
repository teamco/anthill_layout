require([

    '../../../scripts/core/config/main'

], function loadConfig(AntHill) {

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
                var demo = new Application({
                    config: {
                        html: {
                            container: 'body'
                        }
                    }
                });

                demo.view.render();

                if (!demo.model.loadData()) {

                    var workspace1 = demo.api.createWorkspace([], true),
                        page1 = workspace1.api.createPage([], true);
                }

                /**
                 * Store demo
                 * @type {*}
                 */
                AntHill.prototype.demo = demo;
            });
        });
    });
});