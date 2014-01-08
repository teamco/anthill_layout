require([

    '../../../scripts/core/config/main'

], function loadCustomConfig() {

    require([
        'jquery',
        'jqueryui',
        'extends/string',
        'extends/function',
        'lib/extends/array',
        'config/listeners',
        'config/permission'

    ], function loadApplication() {

        require(['test/create']);

    });


});