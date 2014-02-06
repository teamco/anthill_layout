define([

    '../../../scripts/core/config/main'

], function loadCustomConfig(require) {

    require([
        'config/debugger',

        'public/demo/javascript/listeners',
        'public/demo/javascript/permission'

    ], function loadApplication() {

        require(['test/create'], function initDemo(app) {

            /**
             * Define demo application
             * @type {*}
             */
            window.anthill.demo = app;
        });
    });
});