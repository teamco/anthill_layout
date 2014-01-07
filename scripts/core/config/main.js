requirejs.config({
    baseUrl: 'scripts/core',
    paths: {
        config: 'config',
        application: 'application',
        api: 'api',

        controller: 'controller',
        model: 'model',
        view: 'view',

        event: 'event',
        permission: 'permission',

        extends: 'lib/extends',
        modules: 'lib/modules',

        test: 'test',

        jquery: 'lib/jquery/jquery.min',
        jqueryui: 'lib/jquery/jquery-ui-1.10.3.custom.min'
    },

    shim: {
        jqueryui: {deps: ['jquery']}
    }
});

require([
    'jquery',
    'jqueryui',
    'extends/string',
    'extends/function',
    'lib/extends/array',
    'config/listeners',
    'config/permission'
], function () {

    require(['test/create'])

});