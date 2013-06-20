requirejs.config({
    baseUrl: 'scripts/core',
    paths: {
        config: 'config',
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

require([
    'config/listeners',
    'config/permission',
    'test/create'
]);