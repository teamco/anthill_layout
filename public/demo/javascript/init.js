require([

    '../../../scripts/core/config/main'

], function loadCustomConfig() {

    require([
        'jquery',
        'jqueryui'
    ], function loadConfig() {

        require([
            'extends/function',
            'extends/string',
            'extends/array',
            'config/listeners',
            'config/debugger',
            'config/permission',

            'public/demo/javascript/listeners',
            'public/demo/javascript/permission'

        ], function loadApplication() {

            require(['test/create']);

        });

    });

});