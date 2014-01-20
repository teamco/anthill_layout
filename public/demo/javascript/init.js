require([

    '../../../scripts/core/config/main'

], function loadCustomConfig(require) {

    require([
        'config/debugger',

        'public/demo/javascript/listeners',
        'public/demo/javascript/permission'

    ], function loadApplication() {

        require(['test/create'], function initDemo(app) {
            window.demo = {
                app: app
            };

        })

    });
});