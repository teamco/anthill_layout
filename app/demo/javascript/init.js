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
            'config/permission'

        ], function loadApplication() {

            require(['test/create']);

        });

    });

});