requirejs.config({
    baseUrl: 'scripts/core',
    paths: {
        config: 'config',
        jqueryui: 'lib/jquery/jquery-ui-1.10.2.custom.min',
        application: 'application',
        api: 'api',
        controller: 'controller',
        model: 'model',
        event: 'event',
        view: 'view',
        permission: 'permission',
        test: 'test',
        extends: 'lib/extends',
        modules: 'lib/modules'
    }
});

define([
    'config/listeners',
    'config/permission',
    'test/create'
], function defineApp() {
});