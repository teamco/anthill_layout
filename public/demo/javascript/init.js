require([

    '../../../scripts/core/config/main'

], function loadCustomConfig(require) {

    require([
        'public/demo/javascript/listeners',
        'public/demo/javascript/permission'
    ], function loadApplication() {

        require([
            'config/debugger'
        ], function initDebug(){

            require([
                'test/create'
            ], function initDemo(app) {

                /**
                 * Define demo application
                 * @type {*}
                 */
                window.anthill.demo = app;
            });
        });
    });
});